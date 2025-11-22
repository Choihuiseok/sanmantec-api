"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import {
  Controller,
  FormProvider,
  useFormContext,
  useFormState,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import { cn } from "./utils";

// ============================================================================
// FORM PROVIDER
// ============================================================================
function Form({
  className,
  ...props
}: React.ComponentProps<typeof FormProvider>) {
  return <FormProvider {...props} />;
}

// ============================================================================
// FORM FIELD WRAPPER
// ============================================================================
function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) {
  return <Controller {...props} />;
}

// ============================================================================
// FORM ITEM CONTEXT
// ============================================================================
type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

function useFormItem() {
  const ctx = React.useContext(FormItemContext);
  if (!ctx) throw new Error("useFormItem must be used within <FormItem />");
  return ctx;
}

// ============================================================================
// FORM ITEM
// ============================================================================
function FormItem({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const id = React.useId();
  return (
    <FormItemContext.Provider value={{ id }}>
      <div data-slot="form-item" className={cn("space-y-1", className)} {...props} />
    </FormItemContext.Provider>
  );
}

// ============================================================================
// LABEL
// ============================================================================
function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  const { id } = useFormItem();
  return (
    <LabelPrimitive.Root
      data-slot="form-label"
      htmlFor={id}
      className={cn("text-sm font-medium", className)}
      {...props}
    />
  );
}

// ============================================================================
// CONTROL
// ============================================================================
function FormControl({
  className,
  ...props
}: React.ComponentProps<typeof Slot>) {
  const { id } = useFormItem();
  return (
    <Slot
      data-slot="form-control"
      id={id}
      className={className}
      {...props}
    />
  );
}

// ============================================================================
// DESCRIPTION
// ============================================================================
function FormDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="form-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

// ============================================================================
// MESSAGE
// ============================================================================
function FormMessage({
  className,
  children,
  ...props
}: React.ComponentProps<"p">) {
  const { name } = useFormItemMessage();
  const { errors } = useFormState();

  const error = name && errors[name];

  return (
    <p
      data-slot="form-message"
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {error ? String(error.message ?? "Invalid input") : children}
    </p>
  );
}

function useFormItemMessage() {
  try {
    const ctx = useFormContext();
    return ctx;
  } catch {
    return {} as any;
  }
}

export {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
};
