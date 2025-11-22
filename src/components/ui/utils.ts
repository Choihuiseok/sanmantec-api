import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn() — Tailwind-safe className merge 함수
 * 
 * - clsx: 조건부 className 처리
 * - tailwind-merge: Tailwind 중복 클래스 안전하게 병합
 * 
 * ★ 모든 UI 컴포넌트에서 className 안정적 통합을 지원하는 핵심 함수
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
