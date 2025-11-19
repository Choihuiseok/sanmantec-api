window.App = window.App || {};

(function () {
  const $ = (id) => document.getElementById(id);

  document.addEventListener('DOMContentLoaded', async () => {
    // Elements
    const loginView = $('login-view');
    const signupView = $('signup-view');
    const dashView = $('dashboard-view');

    const toSignupBtn = $('toSignupBtn');
    const toLoginBtn = $('toLoginBtn');
    const openCreateBtn = $('openCreateBtn');
    const openClaimBtn = $('openClaimBtn');
    const emptyCreateBtn = $('emptyCreateBtn');
    const listCreateBtn = $('listCreateBtn');
    const logoutBtn = $('logoutBtn');

    const loginUserId = $('loginUserId');
    const loginPassword = $('loginPassword');
    const loginTogglePw = $('loginTogglePw');
    const signupUserId = $('signupUserId');
    const signupPassword = $('signupPassword');
    const signupPassword2 = $('signupPassword2');
    const pwMatchMsg = $('pwMatchMsg');
    const walletListOutgoing = $('wallet-list-outgoing');
    const emptyState = $('empty-state');

    // 🔔 Ping 출석 체크 버튼 요소
    const pingTestBtn = $('pingTestBtn');

    const VIEWS = [loginView, signupView, dashView];

    function getUserId() { return window._userId || null; }
    const ctx = { walletListOutgoing, emptyState, getUserId };

    function renderWallets(list) {
      walletListOutgoing.innerHTML = "";
      if (!list || list.length === 0) {
        emptyState.classList.remove("hidden");
        return;
      }
      emptyState.classList.add("hidden");
      for (const w of list) {
        walletListOutgoing.appendChild(App.createWalletCard(w.address, w.keystore_json, false, ctx));
      }
    }

    async function loadWallets(userId) {
      try {
        const wallets = await App.apiGetWallets(userId);
        renderWallets(wallets);
      } catch {
        renderWallets([]);
      }
    }

    // 토글 비밀번호
    loginTogglePw.addEventListener('click', () => {
      const showPw = loginPassword.type === 'password';
      loginPassword.type = showPw ? 'text' : 'password';
      loginTogglePw.textContent = showPw ? 'Hide' : 'Show';
    });

    // 회원가입 비밀번호 일치
    function checkMatch() {
      const p1 = signupPassword.value, p2 = signupPassword2.value;
      if (!p1 && !p2) { pwMatchMsg.textContent = ''; return; }
      pwMatchMsg.textContent = p1 === p2 ? '비밀번호가 일치합니다.' : '비밀번호가 일치하지 않습니다.';
    }
    signupPassword.addEventListener('input', checkMatch);
    signupPassword2.addEventListener('input', checkMatch);

    // 회원가입
    signupView.addEventListener('submit', async (e) => {
      e.preventDefault();
      const userId = signupUserId.value.trim();
      const password = signupPassword.value;
      if (!userId || password.length < 8 || password !== signupPassword2.value) {
        alert('입력 정보를 다시 확인해주세요.'); return;
      }
      try {
        const result = await App.apiSignup(userId, password);
        alert(result.message);
        App.show(loginView, VIEWS);
      } catch (e2) {
        alert('회원가입 실패: ' + (e2.message || e2));
      }
    });

    // 로그인
    loginView.addEventListener('submit', async (e) => {
      e.preventDefault();
      const userId = loginUserId.value.trim();
      const password = loginPassword.value;
      try {
        const result = await App.apiLogin(userId, password);
        alert(result.message);
        window._userId = userId;
        localStorage.setItem("userId", userId);
        await loadWallets(userId);
        App.show(dashView, VIEWS);
      } catch (e2) {
        alert('로그인 실패: ' + (e2.message || e2));
      }
    });

    // 상속받기 (더미)
    openClaimBtn.addEventListener('click', () => alert("이 기능은 구현되지 않았습니다."));

    // 지갑 생성
    async function doCreateWalletFlow() {
      const ethers = window.ethers;
      const userId = getUserId();
      if (!userId) { alert("로그인 후 이용해주세요."); App.show(loginView, VIEWS); return; }

      let passphrase = prompt("지갑 복구용 패스프레이즈를 설정하세요.\n(최소 16자 + 특수문자 1개 이상)");
      while (passphrase !== null && !App.validatePassphrase(passphrase)) {
        alert("형식을 확인하세요: 최소 16자 + 특수문자 1개 이상 포함해야 합니다.");
        passphrase = prompt("지갑 복구용 패스프레이즈를 다시 입력하세요.\n(최소 16자 + 특수문자 1개 이상)");
      }
      if (passphrase === null) return;

      try {
        const wallet = ethers.Wallet.createRandom();
        const keystoreJson = await wallet.encrypt(passphrase);

        const result = await App.apiSaveWallet(userId, wallet.address, keystoreJson);

        const initialName = prompt("이 지갑의 표시 이름을 입력하세요 (선택, 나중에 수정 가능)", "");
        if (initialName && initialName.trim()) {
          App.setWalletName(result.address, initialName.trim());
        }

        alert("지갑 생성/저장 성공!\n주소: " + result.address);

        emptyState.classList.add("hidden");
        walletListOutgoing.prepend(App.createWalletCard(result.address, keystoreJson, true, ctx));
      } catch (err) {
        alert("지갑 생성 실패: " + (err.message || err));
      }
    }

    // 버튼 연결
    openCreateBtn.addEventListener('click', () => {
      alert("이 기능은 구현되지 않았습니다.");
    });
    emptyCreateBtn.addEventListener('click', doCreateWalletFlow);
    listCreateBtn.addEventListener('click', doCreateWalletFlow);

    // 🔔 Ping 출석 체크 버튼 클릭 시
    if (pingTestBtn) {
      pingTestBtn.addEventListener('click', () => {
        alert("출석 체크 완료!");
      });
    }

    // 로그아웃
    logoutBtn.addEventListener('click', () => {
      window._userId = null;
      localStorage.removeItem("userId");
      walletListOutgoing.innerHTML = "";
      emptyState.classList.remove("hidden");
      App.show(loginView, VIEWS);
    });

    // 자동 로그인 복원
    const savedUser = localStorage.getItem("userId");
    if (savedUser) {
      window._userId = savedUser;
      await loadWallets(savedUser);
      App.show(dashView, VIEWS);
    } else {
      toSignupBtn.addEventListener('click', () => App.show(signupView, VIEWS));
      toLoginBtn.addEventListener('click', () => App.show(loginView, VIEWS));
      App.show(loginView, VIEWS);
    }
  });
})();
