import * as React from "react";
import { cn } from "../utils/cn";

export interface DatePickerProps {
  date: Date | undefined;
  onSelect: (date: Date | undefined) => void;
  className?: string;
  disabled?: boolean;
}

// Simplified date picker that just uses a native input
export function DatePicker({ date, onSelect, className, disabled }: DatePickerProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value) {
      onSelect(new Date(value));
    } else {
      onSelect(undefined);
    }
  };

  return (
    <input
      type="date"
      value={date ? date.toISOString().split('T')[0] : ''}
      onChange={handleChange}
      className={cn(
        "flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300",
        className
      )}
      disabled={disabled}
    />
  );
}
