"use client";

import * as React from "react";
import * as RechartsPrimitive from "recharts";
import { cn } from "./utils";

// THEMES: 사용자가 정의한 라이트/다크 모드 CSS root
const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { theme?: Partial<Record<keyof typeof THEMES, string>>; color?: never }
  );
};

// ============================================================================
// ChartContainer
// ============================================================================
function ChartContainer({
  config,
  className,
  children,
  ...props
}: {
  config: ChartConfig;
  className?: string;
  children?: React.ReactNode;
} & React.ComponentProps<"div">) {
  return (
    <div
      data-chart
      className={cn("relative w-full min-h-[250px]", className)}
      {...props}
    >
      {children}
      <ChartStyle config={config} />
    </div>
  );
}

// ============================================================================
// CHART STYLE (Theme mapping)
// ============================================================================
function ChartStyle({ config }: { config: ChartConfig }) {
  const style = React.useMemo(() => {
    let css = "";

    Object.entries(config).forEach(([key, value]) => {
      if (value.color) {
        css += `
          [data-chart] [data-key="${key}"] {
            --chart-color-${key}: ${value.color};
          }
        `;
      }

      if (value.theme) {
        Object.entries(value.theme).forEach(([theme, color]) => {
          if (color) {
            css += `
              ${THEMES[theme as keyof typeof THEMES]} [data-chart] [data-key="${key}"] {
                --chart-color-${key}: ${color};
              }
            `;
          }
        });
      }
    });

    return css;
  }, [config]);

  return <style dangerouslySetInnerHTML={{ __html: style }} />;
}

// ============================================================================
// LEGEND
// ============================================================================
function ChartLegend({
  className,
  align = "center",
  verticalAlign = "bottom",
  ...props
}: React.ComponentProps<typeof RechartsPrimitive.Legend>) {
  return (
    <RechartsPrimitive.Legend
      align={align}
      verticalAlign={verticalAlign}
      wrapperStyle={{
        paddingTop: "12px",
        paddingBottom: "12px",
      }}
      className={className}
      {...props}
    />
  );
}

function ChartLegendContent({
  payload,
  config,
  className,
  ...props
}: {
  payload?: any[];
  config: ChartConfig;
  className?: string;
}) {
  if (!payload) return null;

  return (
    <ul
      data-chart-legend
      className={cn(
        "flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm",
        className
      )}
      {...props}
    >
      {payload.map((item, idx) => {
        const key = item.dataKey;
        const color =
          config[key]?.theme?.light ??
          config[key]?.theme?.dark ??
          config[key]?.color ??
          item.color;

        const label =
          typeof config[key]?.label === "string"
            ? config[key]?.label
            : config[key]?.label ?? key;

        const Icon = config[key]?.icon;

        return (
          <li key={idx} className="flex items-center gap-1.5">
            <span
              className="inline-block size-3 rounded-sm"
              style={{ backgroundColor: color }}
            />
            {Icon && <Icon className="size-3" />}
            <span className="text-muted-foreground">{label}</span>
          </li>
        );
      })}
    </ul>
  );
}

// ============================================================================
// TOOLTIP
// ============================================================================
function ChartTooltip({
  cursor = { strokeDasharray: "3 3" },
  content,
  ...props
}: React.ComponentProps<typeof RechartsPrimitive.Tooltip>) {
  return (
    <RechartsPrimitive.Tooltip
      cursor={cursor}
      content={content}
      wrapperStyle={{ outline: "none" }}
      {...props}
    />
  );
}

function ChartTooltipContent({
  payload,
  label,
  config,
  className,
  ...props
}: {
  payload?: any[];
  label?: string;
  config: ChartConfig;
  className?: string;
}) {
  if (!payload?.length) return null;

  return (
    <div
      data-chart-tooltip
      className={cn(
        "rounded-lg border bg-popover p-2 shadow-md text-sm",
        className
      )}
      {...props}
    >
      {label && (
        <div className="mb-1 font-medium text-foreground">{label}</div>
      )}

      <div className="space-y-1">
        {payload.map((item, idx) => {
          const key = item.dataKey;
          const color =
            config[key]?.theme?.light ??
            config[key]?.theme?.dark ??
            config[key]?.color ??
            item.color;

          const displayLabel =
            typeof config[key]?.label === "string"
              ? config[key]?.label
              : config[key]?.label ?? key;

          return (
            <div key={idx} className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-2">
                <span
                  className="inline-block size-3 rounded-sm"
                  style={{ background: color }}
                />
                <span className="text-muted-foreground">{displayLabel}</span>
              </span>
              <span className="font-medium text-foreground">
                {item.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// Export
// ============================================================================
export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
};
