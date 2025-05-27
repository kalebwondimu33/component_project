import * as React from "react";
import { cn } from "../utils/cn";
import { TaskStatus } from "../types/task";

interface StatusBadgeProps {
  status: TaskStatus;
  className?: string;
}

const statusConfig: Record<TaskStatus, { color: string; label: string }> = {
  todo: {
    color: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300",
    label: "To Do",
  },
  "in-progress": {
    color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    label: "In Progress",
  },
  completed: {
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    label: "Completed",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        config.color,
        className
      )}
    >
      {config.label}
    </span>
  );
}
