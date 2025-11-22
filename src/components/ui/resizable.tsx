"use client";

import * as React from "react";
import { GripVerticalIcon } from "lucide-react";
import * as ResizablePrimitive from "react-resizable-panels";

import { cn } from "./utils";

// ============================================================================
// PANEL GROUP
// ============================================================================
function ResizablePanelGroup({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) {
  return (
    <ResizablePrimitive.PanelGroup
      data-slot="resizable-panel-group"
      className={cn("flex w-full h-full", className)}
      {...props}
    />
  );
}

// ============================================================================
// PANEL
// ============================================================================
function ResizablePanel({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.Panel>) {
  return (
    <ResizablePrimitive.Panel
      data-slot="resizable-panel"
      className={cn("flex", className)}
      {...props}
    />
  );
}

// ============================================================================
// HANDLE
// ============================================================================
function ResizableHandle({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean;
}) {
  return (
    <ResizablePrimitive.PanelResizeHandle
      data-slot="resizable-panel-handle"
      className={cn(
        "group relative flex items-center justify-center bg-border transition-all",
        // 기본 크기
        "data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full",
        "data-[orientation=vertical]:w-px data-[orientation=vertical]:h-full",
        // hover 효과
        "data-[orientation=horizontal]:hover:h-1 data-[orientation=vertical]:hover:w-1",
        // dragging 상태
        "data-[state=dragging]:bg-primary",
        className
      )}
      {...props}
    >
      {withHandle && (
        <div
          data-slot="resizable-panel-handle-icon"
          className="z-10 flex h-4 w-3 items-center justify-center rounded-xs border bg-border"
        >
          <GripVerticalIcon className="size-2.5" />
        </div>
      )}
    </ResizablePrimitive.PanelResizeHandle>
  );
}

// ============================================================================
// EXPORT
// ============================================================================
export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
