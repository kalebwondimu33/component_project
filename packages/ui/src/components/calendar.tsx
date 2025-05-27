import * as React from "react";
import { cn } from "../utils/cn";

// Since we're now using a native date input in the DatePicker component,
// this Calendar component is simplified to just serve as a placeholder
// in case it's still referenced elsewhere in the codebase.

export interface CalendarProps {
  className?: string;
  selected?: Date;
  onSelect?: (date?: Date) => void;
  mode?: 'single' | 'range' | 'multiple';
  initialFocus?: boolean;
  [key: string]: any;
}

function Calendar({
  className,
  selected,
  onSelect,
  ...props
}: CalendarProps) {
  return (
    <div className={cn("p-3 text-center", className)}>
      <p>Calendar component simplified for this project.</p>
      <p>Using native date input instead.</p>
    </div>
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
