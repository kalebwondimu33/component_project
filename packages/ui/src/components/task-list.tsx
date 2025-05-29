import * as React from "react";
import { Task } from "../../../utils/types/task";
import { TaskCard } from "./task-card";
import { cn } from "../utils/cn";

interface TaskListProps {
  tasks: Task[];
  onEdit?: (task: Task) => void;
  onDelete?: (taskId: string) => void;
  onStatusChange?: (taskId: string, status: Task['status']) => void;
  className?: string;
  emptyMessage?: string;
  layout?: "grid" | "list";
}

export function TaskList({
  tasks,
  onEdit,
  onDelete,
  onStatusChange,
  className,
  emptyMessage = "No tasks found.",
  layout = "grid",
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="flex items-center justify-center h-40 text-slate-500 dark:text-slate-400 text-center p-4 border border-dashed rounded-lg">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div
      className={cn(
        layout === "grid"
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          : "flex flex-col space-y-4",
        className
      )}
    >
      {tasks.map((task) => (
        <div key={task.id} className={layout === "grid" ? "" : "w-full"}>
          <TaskCard
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
          />
        </div>
      ))}
    </div>
  );
}
