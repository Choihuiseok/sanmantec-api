"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "./utils";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          "inline-flex h-7 w-7 items-center justify-center rounded-md border text-sm ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring",
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell:
          "h-8 w-8 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent [&:has([aria-selected].range-end)]:rounded-r-md [&:has([aria-selected].range-start)]:rounded-l-md",
        day:
          cn(
            "h-8 w-8 p-0 font-normal aria-selected:bg-primary aria-selected:text-primary-foreground",
          ),
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring",
        day_today:
          "bg-accent/50 text-foreground",
        ...classNames,
      }}
      components={{
        ChevronLeft: (props) => <ChevronLeft {...props} className="h-4 w-4" />,
        ChevronRight: (props) => <ChevronRight {...props} className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}

export { Calendar };
