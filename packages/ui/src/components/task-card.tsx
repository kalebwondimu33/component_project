import * as React from "react";
// Simple SVG icons instead of lucide-react to avoid dependency issues
const MoreHorizontalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="1"></circle>
    <circle cx="19" cy="12" r="1"></circle>
    <circle cx="5" cy="12" r="1"></circle>
  </svg>
);

const PencilIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18"></path>
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
  </svg>
);
import { formatDate } from "../utils/format-date";
import { Task } from "../types/task";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";
import { PriorityBadge } from "./priority-badge";
import { StatusBadge } from "./status-badge";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "./dropdown-menu";

interface TaskCardProps {
  task: Task;
  onEdit?: (task: Task) => void;
  onDelete?: (taskId: string) => void;
  onStatusChange?: (taskId: string, status: Task['status']) => void;
}

export function TaskCard({ task, onEdit, onDelete, onStatusChange }: TaskCardProps) {
  const handleStatusChange = (status: Task['status']) => {
    if (onStatusChange) {
      onStatusChange(task.id, status);
    }
  };

  return (
    <Card className="w-full h-full transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="mr-2 break-words">{task.title}</CardTitle>
          
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <span className="h-4 w-4"><MoreHorizontalIcon /></span>
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onEdit?.(task)}>
                <span className="mr-2 h-4 w-4"><PencilIcon /></span>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600 dark:text-red-400"
                onClick={() => onDelete?.(task.id)}
              >
                <span className="mr-2 h-4 w-4"><TrashIcon /></span>
                Delete
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Change Status</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleStatusChange('todo')}>
                To Do
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange('in-progress')}>
                In Progress
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange('completed')}>
                Completed
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <CardDescription className="flex flex-wrap gap-2 mt-2">
          <PriorityBadge priority={task.priority} />
          <StatusBadge status={task.status} />
          {task.dueDate && (
            <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-800 dark:bg-slate-700 dark:text-slate-300">
              Due: {formatDate(task.dueDate)}
            </span>
          )}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line">
          {task.description}
        </p>
      </CardContent>
      
      <CardFooter className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
        <span>Created: {formatDate(task.createdAt, 'MMM d, yyyy')}</span>
        {task.updatedAt !== task.createdAt && (
          <span>Updated: {formatDate(task.updatedAt, 'MMM d, yyyy')}</span>
        )}
      </CardFooter>
    </Card>
  );
}
