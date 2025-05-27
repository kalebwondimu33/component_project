"use client";

import { useState } from "react";
import {
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  TaskForm,
  TaskList,
  useTasks,
  Task,
  CreateTaskInput,
  UpdateTaskInput,
  TaskStatus
} from "ui";
// Using a simple icon instead of lucide-react to avoid dependency issues
// We'll create a simple Plus icon component
const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

export default function Home() {
  const {
    tasks,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
    getTasksByStatus,
  } = useTasks();

  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TaskStatus | "all">("all");

  const handleCreateTask = (input: CreateTaskInput) => {
    createTask(input);
  };

  const handleUpdateTask = (input: UpdateTaskInput) => {
    updateTask(input);
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setIsFormOpen(true);
  };

  const handleDeleteTask = (taskId: string) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTask(taskId);
    }
  };

  const handleStatusChange = (taskId: string, status: TaskStatus) => {
    updateTaskStatus(taskId, status);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value as TaskStatus | "all");
  };

  const filteredTasks = activeTab === "all" 
    ? tasks 
    : getTasksByStatus(activeTab as TaskStatus);

  return (
    <main className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', lineHeight: '1.2' }}>Task Manager</h1>
        <Button onClick={() => setIsFormOpen(true)}>
          <span style={{ marginRight: '0.5rem', height: '1rem', width: '1rem' }}><PlusIcon /></span>
          Add Task
        </Button>
      </div>

      <Tabs defaultValue="all" style={{ width: '100%' }} onValueChange={handleTabChange}>
        <TabsList style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', width: '100%', maxWidth: '28rem', marginBottom: '2rem' }}>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="todo">To Do</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} style={{ marginTop: 0 }}>
          <TaskList
            tasks={filteredTasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onStatusChange={handleStatusChange}
            layout="grid"
            emptyMessage={`No ${activeTab === 'all' ? '' : activeTab} tasks found. Click "Add Task" to create one.`}
          />
        </TabsContent>
      </Tabs>

      <TaskForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={selectedTask ? handleUpdateTask : handleCreateTask}
        task={selectedTask}
        title={selectedTask ? "Edit Task" : "Add Task"}
      />
    </main>
  );
}
