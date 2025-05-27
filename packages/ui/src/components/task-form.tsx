import * as React from "react";
import { CreateTaskInput, Task, TaskPriority, UpdateTaskInput } from "../types/task";
import { Button } from "./button";
import { Input } from "./input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./dialog";
import { PriorityBadge } from "./priority-badge";

interface TaskFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (task: CreateTaskInput | UpdateTaskInput) => void;
  task?: Task;
  title?: string;
}

export function TaskForm({ open, onOpenChange, onSubmit, task, title = "Add Task" }: TaskFormProps) {
  const [formState, setFormState] = React.useState<CreateTaskInput | UpdateTaskInput>({
    title: task?.title || "",
    description: task?.description || "",
    priority: task?.priority || "medium",
    dueDate: task?.dueDate || null,
  });

  React.useEffect(() => {
    if (task) {
      setFormState({
        id: task.id,
        title: task.title,
        description: task.description,
        priority: task.priority,
        dueDate: task.dueDate,
      });
    } else {
      setFormState({
        title: "",
        description: "",
        priority: "medium" as TaskPriority,
        dueDate: null,
      });
    }
  }, [task, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handlePriorityChange = (value: TaskPriority) => {
    setFormState((prev) => ({ ...prev, priority: value }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormState((prev) => ({ 
      ...prev, 
      dueDate: value ? new Date(value).toISOString() : null 
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formState);
    if (!task) {
      setFormState({
        title: "",
        description: "",
        priority: "medium" as TaskPriority,
        dueDate: null,
      });
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="title" className="text-sm font-medium">
                Title
              </label>
              <Input
                id="title"
                name="title"
                value={formState.title}
                onChange={handleChange}
                placeholder="Task title"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formState.description}
                onChange={handleChange}
                placeholder="Task description"
                className="flex min-h-[80px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="priority" className="text-sm font-medium">
                  Priority
                </label>
                <Select 
                  value={formState.priority} 
                  onValueChange={handlePriorityChange}
                >
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority">
                      {formState.priority && (
                        <div className="flex items-center gap-2">
                          <PriorityBadge priority={formState.priority} />
                        </div>
                      )}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">
                      <div className="flex items-center gap-2">
                        <PriorityBadge priority="low" />
                      </div>
                    </SelectItem>
                    <SelectItem value="medium">
                      <div className="flex items-center gap-2">
                        <PriorityBadge priority="medium" />
                      </div>
                    </SelectItem>
                    <SelectItem value="high">
                      <div className="flex items-center gap-2">
                        <PriorityBadge priority="high" />
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="dueDate" className="text-sm font-medium">
                  Due Date
                </label>
                <Input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  value={formState.dueDate ? new Date(formState.dueDate).toISOString().split('T')[0] : ""}
                  onChange={handleDateChange}
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{task ? "Update" : "Create"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
