"use client";

import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "./utils";

// ============================================================================
// ROOT
// ============================================================================
function NavigationMenu({
  className,
  viewport = true,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
  viewport?: boolean;
}) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      className={cn("relative z-10 flex max-w-max flex-1 items-center justify-center", className)}
      {...props}
    >
      {props.children}
      {viewport ? <NavigationMenuViewport /> : null}
    </NavigationMenuPrimitive.Root>
  );
}

// ============================================================================
// LIST
// ============================================================================
function NavigationMenuList({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn(
        "group flex list-none items-center justify-center gap-1",
        className
      )}
      {...props}
    />
  );
}

// ============================================================================
// ITEM
// ============================================================================
function NavigationMenuItem(
  props: React.ComponentProps<typeof NavigationMenuPrimitive.Item>
) {
  return <NavigationMenuPrimitive.Item data-slot="navigation-menu-item" {...props} />;
}

// ============================================================================
// TRIGGER
// ============================================================================
const navigationMenuTriggerStyle = cva(
  [
    "inline-flex items-center justify-center",
    "rounded-md px-4 py-2 text-sm font-medium transition-colors",
    "focus:outline-none focus:bg-accent focus:text-accent-foreground",
    "data-[state=open]:bg-accent data-[state=open]:text-accent-foreground"
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-background hover:bg-muted",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerStyle(), "group", className)}
      {...props}
    >
      {children}
      <ChevronDownIcon
        className="ml-1 size-4 transition-transform duration-200 group-data-[state=open]:rotate-180"
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
  );
}

// ============================================================================
// CONTENT
// ============================================================================
function NavigationMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        "left-0 top-0 w-full md:absolute md:w-auto",
        "data-[motion=from-start]:animate-in data-[motion=from-start]:slide-in-from-left-52",
        "data-[motion=from-end]:animate-in data-[motion=from-end]:slide-in-from-right-52",
        "data-[motion=to-start]:animate-out data-[motion=to-start]:slide-out-to-left-52",
        "data-[motion=to-end]:animate-out data-[motion=to-end]:slide-out-to-right-52",
        className
      )}
      {...props}
    />
  );
}

// ============================================================================
// LINK
// ============================================================================
function NavigationMenuLink({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn("inline-flex select-none outline-none", className)}
      {...props}
    />
  );
}

// ============================================================================
// INDICATOR
// ============================================================================
function NavigationMenuIndicator({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
  return (
    <NavigationMenuPrimitive.Indicator
      data-slot="navigation-menu-indicator"
      className={cn(
        "top-full z-20 flex h-1.5 items-end justify-center",
        "data-[state=visible]:animate-in data-[state=hidden]:animate-out",
        className
      )}
      {...props}
    >
      <div className="relative top-[5px] size-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
    </NavigationMenuPrimitive.Indicator>
  );
}

// ============================================================================
// VIEWPORT
// ============================================================================
function NavigationMenuViewport({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
  return (
    <NavigationMenuPrimitive.Viewport
      data-slot="navigation-menu-viewport"
      className={cn(
        "absolute left-0 top-full z-20 h-[var(--radix-navigation-menu-viewport-height)]",
        "w-full origin-top overflow-hidden rounded-md border bg-popover shadow-lg",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "md:w-[var(--radix-navigation-menu-viewport-width)]",
        className
      )}
      {...props}
    />
  );
}

// ============================================================================
// EXPORTS
// ============================================================================
export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
};
