"use client";

import * as React from "react";

const MOBILE_BREAKPOINT = 768;

/**
 * useIsMobile — 안정화(B+) 버전
 * - SSR 안전 (window undefined 방지)
 * - resize 이벤트도 정확히 반영
 * - matchMedia 연동
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    // SSR 보호
    if (typeof window === "undefined") return;

    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    // 초기값 설정
    checkMobile();

    // resize + matchMedia change 둘 다 캐치
    mq.addEventListener("change", checkMobile);
    window.addEventListener("resize", checkMobile);

    return () => {
      mq.removeEventListener("change", checkMobile);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return isMobile;
}
