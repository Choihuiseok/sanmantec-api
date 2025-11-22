"use client";

import * as React from "react";
import { cn } from "./utils";

/**
 * Skeleton Placeholder Component
 * - 로딩 시 사용되는 기본 스켈레톤 UI
 * - Tailwind 기반 애니메이션 포함
 */
function Skeleton({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "animate-pulse rounded-md bg-muted",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
