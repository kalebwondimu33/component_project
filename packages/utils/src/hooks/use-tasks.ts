import { useState, useEffect } from "react";
import { Task, CreateTaskInput, UpdateTaskInput, TaskStatus } from "../../types/task";

// Function to generate a unique ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Hook for managing tasks
export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const loadTasks = () => {
      try {
        const savedTasks = localStorage.getItem("tasks");
        if (savedTasks) {
          setTasks(JSON.parse(savedTasks));
        }
      } catch (error) {
        console.error("Error loading tasks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks, isLoading]);

  // Create a new task
  const createTask = (input: CreateTaskInput): Task => {
    const now = new Date();
    const newTask: Task = {
      id: generateId(),
      title: input.title,
      description: input.description,
      priority: input.priority,
      status: "todo",
      dueDate: input.dueDate || null,
      createdAt: now,
      updatedAt: now,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    return newTask;
  };

  // Update an existing task
  const updateTask = (input: UpdateTaskInput): Task | null => {
    let updatedTask: Task | null = null;

    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === input.id) {
          updatedTask = {
            ...task,
            ...input,
            updatedAt: new Date().toISOString(),
          };
          return updatedTask;
        }
        return task;
      })
    );

    return updatedTask;
  };

  // Delete a task
  const deleteTask = (taskId: string): boolean => {
    let deleted = false;

    setTasks((prevTasks) => {
      const filtered = prevTasks.filter((task) => task.id !== taskId);
      deleted = filtered.length < prevTasks.length;
      return filtered;
    });

    return deleted;
  };

  // Update task status
  const updateTaskStatus = (taskId: string, status: TaskStatus): Task | null => {
    return updateTask({ id: taskId, status });
  };

  // Filter tasks by status
  const getTasksByStatus = (status?: TaskStatus): Task[] => {
    if (!status) return tasks;
    return tasks.filter((task) => task.status === status);
  };

  // Get task by ID
  const getTaskById = (taskId: string): Task | undefined => {
    return tasks.find((task) => task.id === taskId);
  };

  return {
    tasks,
    isLoading,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
    getTasksByStatus,
    getTaskById,
  };
}
