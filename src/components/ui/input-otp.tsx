"use client";

import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { MinusIcon } from "lucide-react";

import { cn } from "./utils";

// ============================================================================
// ROOT
// ============================================================================
function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string;
}) {
  return (
    <OTPInputContext.Provider value={{}}>
      <div
        data-slot="input-otp-container"
        className={cn("flex items-center gap-2", containerClassName)}
      >
        <OTPInput
          data-slot="input-otp"
          className={cn(
            "flex h-10 items-center gap-2",
            className
          )}
          {...props}
        />
      </div>
    </OTPInputContext.Provider>
  );
}

// ============================================================================
// GROUP
// ============================================================================
function InputOTPGroup({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  );
}

// ============================================================================
// SLOT (개별 칸)
// ============================================================================
function InputOTPSlot({
  index,
  className,
  ...props
}: {
  index: number;
  className?: string;
} & React.ComponentProps<"div">) {
  const inputOTP = React.useContext(OTPInputContext);
  const char = (inputOTP as any)?.slots?.[index] ?? "";

  return (
    <div
      data-slot="input-otp-slot"
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-md border text-sm font-medium",
        "border-input bg-background ring-offset-background",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "data-[active=true]:ring-2 data-[active=true]:ring-ring data-[active=true]:ring-offset-2",
        className
      )}
      data-active={char === ""}
      {...props}
    >
      {char || ""}
    </div>
  );
}

// ============================================================================
// SEPARATOR
// ============================================================================
function InputOTPSeparator(
  props: React.ComponentProps<"div">
) {
  return (
    <div
      data-slot="input-otp-separator"
      role="separator"
      className="flex items-center justify-center"
      {...props}
    >
      <MinusIcon className="h-4 w-4 text-muted-foreground" />
    </div>
  );
}

// ============================================================================
// EXPORTS
// ============================================================================
export {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
};
