window.App = window.App || {};

(function () {
  App.createWalletCard = function (address, keystoreJson, allowOneTimeDownload = false, ctx) {
    const ethers = window.ethers;
    const currentName = App.getWalletName(address) || "이름 없음";

    const card = document.createElement("div");
    card.className = "p-4 rounded-xl border border-slate-300 bg-white shadow";
    card.innerHTML = `
      <p class="text-sm text-slate-600">주소</p>
      <p class="font-mono break-all text-indigo-600">${address}</p>

      <div class="mt-1 text-sm text-slate-700">
        <span class="text-slate-500">이름:</span>
        <span class="wallet-name">${App.escapeHtml(currentName)}</span>
        <button class="ml-2 text-xs underline edit-name">수정</button>
      </div>

      <div class="mt-2 text-sm text-slate-700">
        <span class="text-slate-500">잔액:</span>
        <span data-balance-el data-address="${address}">불러오는 중...</span>
        <button class="ml-2 text-xs underline balance-refresh">새로고침</button>
      </div>

      <div class="mt-3 flex flex-wrap gap-2">
        <button class="reveal-btn h-9 px-3 rounded-lg border border-rose-300 text-rose-600 bg-white text-sm hover:bg-rose-50">개인키 보기</button>

        <button class="download-btn h-9 px-3 rounded-lg border border-slate-300 text-slate-700 bg-white text-sm hover:bg-slate-50 ${allowOneTimeDownload ? "" : "hidden"}">
          keystore.json 다운로드
        </button>
        <button class="download-done h-9 px-3 rounded-lg border border-slate-200 text-slate-400 bg-slate-50 text-sm ${allowOneTimeDownload ? "hidden" : ""}" disabled>
          keystore.json (생성 직후 1회 제공)
        </button>

        <button class="send-btn h-9 px-3 rounded-lg border border-indigo-300 text-indigo-700 bg-white text-sm hover:bg-indigo-50">송금</button>
        <button class="delete-btn h-9 px-3 rounded-lg border border-slate-300 text-slate-700 bg-white text-sm hover:bg-slate-50">삭제</button>
      </div>
    `;

    // 이름 수정
    card.querySelector(".edit-name").addEventListener("click", () => {
      const cur = App.getWalletName(address) || "";
      const next = prompt("이 지갑의 표시 이름을 입력하세요 (비우면 삭제)", cur);
      if (next === null) return;
      App.setWalletName(address, next);
      card.querySelector(".wallet-name").textContent = next && next.trim() ? next.trim() : "이름 없음";
    });

    // 잔액
    const balEl = card.querySelector("[data-balance-el]");
    App.fetchAndRenderBalance(address, balEl);
    card.querySelector(".balance-refresh").addEventListener("click", () => {
      balEl.textContent = "불러오는 중...";
      App.fetchAndRenderBalance(address, balEl);
    });

    // 개인키 보기
    card.querySelector(".reveal-btn").addEventListener("click", async () => {
      try {
        const pass = prompt("패스프레이즈를 입력하세요(최소 16자 + 특수문자 1개 이상)");
        if (!pass) return;
        const w = await ethers.Wallet.fromEncryptedJson(keystoreJson, pass);
        const pk = w.privateKey;
        const box = document.createElement("div");
        box.className = "mt-3 p-3 rounded-xl border border-rose-300 bg-rose-50 text-rose-800";
        box.innerHTML = `
          <div class="font-semibold mb-1">⚠ 개인키(30초 후 자동 숨김)</div>
          <div class="font-mono break-all text-sm">${pk}</div>
          <button class="mt-2 px-3 h-8 rounded-lg border border-slate-300 bg-white text-slate-700 text-xs" id="copyPkBtn">복사</button>
        `;
        card.appendChild(box);
        box.querySelector("#copyPkBtn").addEventListener("click", async () => {
          try { await navigator.clipboard.writeText(pk); alert("개인키가 복사되었습니다."); }
          catch { alert("복사 실패. 수동 복사해주세요."); }
        });
        setTimeout(() => box.remove(), 30000);
      } catch {
        alert("복호화 실패: 패스프레이즈가 올바른지 확인하세요.");
      }
    });

    // keystore 다운로드 (생성 직후 1회)
    const dlBtn = card.querySelector(".download-btn");
    const dlDone = card.querySelector(".download-done");
    if (allowOneTimeDownload && dlBtn) {
      dlBtn.addEventListener("click", async () => {
        try {
          const pass = prompt("패스프레이즈를 입력하세요(다운로드 전 확인: 최소 16자 + 특수문자 1개 이상)");
          if (!pass) return;
          await ethers.Wallet.fromEncryptedJson(keystoreJson, pass); // 검증
          const blob = new Blob([keystoreJson], { type: "application/json" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `keystore-${address.slice(0,10)}-${Date.now()}.json`;
          a.click();
          URL.revokeObjectURL(url);
          alert("keystore.json이 다운로드되었습니다.");

          dlBtn.classList.add("hidden");
          dlDone.classList.remove("hidden");
        } catch {
          alert("다운로드 실패: 패스프레이즈가 올바른지 확인하세요.");
        }
      });
    }

    // 송금
    card.querySelector(".send-btn").addEventListener("click", async () => {
      try {
        const to = prompt("받는 지갑 주소를 입력하세요 (0x...)");
        if (!to) return;
        if (!window.ethers.isAddress(to)) { alert("지갑 주소 형식이 올바르지 않습니다."); return; }

        const amountStr = prompt("보낼 금액(ETH)을 입력하세요 (예: 0.01)");
        if (!amountStr) return;
        const amount = Number(amountStr);
        if (!isFinite(amount) || amount <= 0) { alert("금액이 올바르지 않습니다."); return; }

        const pass = prompt("이 지갑의 패스프레이즈를 입력하세요 (최소 16자 + 특수문자 1개 이상)");
        if (!pass) return;

        const provider = await App.getProvider();
        const wallet = await window.ethers.Wallet.fromEncryptedJson(keystoreJson, pass);
        const signer = wallet.connect(provider);

        try {
          const bal = await provider.getBalance(wallet.address);
          const need = window.ethers.parseEther(amountStr);
          if (bal < need) {
            alert("잔액이 부족합니다. (가스비 포함 여유 필요)");
            return;
          }
        } catch {}

        const tx = await signer.sendTransaction({ to, value: window.ethers.parseEther(amountStr) });
        alert(`전송 전송됨!\nTX Hash: ${tx.hash}`);
        if (typeof window.open === "function") {
          window.open(`https://kaiascan.io/tx/${tx.hash}`, "_blank");
        }

        if (balEl) balEl.textContent = "전송 반영 중...";
        await provider.waitForTransaction(tx.hash);
        if (balEl) App.fetchAndRenderBalance(address, balEl);
      } catch (e) {
        const msg = e?.reason || e?.message || String(e);
        if (/user rejected|denied/i.test(msg)) alert("사용자가 전송을 취소했습니다.");
        else if (/insufficient funds/i.test(msg)) alert("잔액이 부족합니다. (가스비 포함)");
        else alert("전송 실패: " + msg);
      }
    });

    // 삭제
    card.querySelector(".delete-btn").addEventListener("click", async () => {
      if (!confirm("정말 이 지갑을 삭제할까요? (자산이 있으면 반드시 먼저 이동하세요)")) return;
      const userId = ctx.getUserId();
      if (!userId) return alert("로그인 필요");
      const pw = prompt("계정 비밀번호를 입력해주세요(삭제 확인)");
      if (!pw) return;
      try {
        await App.apiDeleteWallet(userId, pw, address);
        App.deleteWalletName(address);
        card.remove();
        if (ctx.walletListOutgoing.children.length === 0) ctx.emptyState.classList.remove("hidden");
        alert("지갑이 삭제되었습니다.");
      } catch (e) {
        alert(e.message || "삭제 실패");
      }
    });

    return card;
  };
})();
