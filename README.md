[watch the demo by clicking this link] (https://github.com/user-attachments/assets/02644279-7e7d-4998-883a-5b12f452ebb1)

# Task Manager

A modern task management application built with Next.js, React, and TypeScript.

## Project Structure

This is a monorepo using pnpm workspaces with the following packages:

### Apps
- `apps/web` - Next.js web application
  - Main task management interface
  - Time tracking functionality
  - Task statistics and analytics

### Packages
- `packages/ui` - Shared UI components
  - Button, Card, Dialog, and other base components
  - Task-specific components (TaskCard, TaskList, TaskForm)
  - Form components (Input, Select, DatePicker)
  - Status and priority badges

- `packages/task-tracker` - Time tracking functionality
  - TimeEntry type definitions
  - Timer components
  - Time entry management

- `packages/task-stats` - Task statistics and analytics
  - Task statistics components
  - Time tracking analytics
  - Status distribution visualization

- `packages/utils` - Shared utilities
  - Task management hooks
  - Common types
  - Helper functions

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build all packages
pnpm build
```

## Features

- Task Management
  - Create, edit, and delete tasks
  - Set task priorities and status
  - Filter tasks by status

- Time Tracking
  - Track time spent on tasks
  - Start/stop timer
  - View time entry history

- Statistics
  - Task status overview
  - Time tracking metrics
  - Status distribution visualization

## Technologies Used

- **Monorepo Management**: pnpm workspaces, Turborepo
- **Frontend Framework**: Next.js, React
- **UI Components**: Radix UI primitives
- **Styling**: Tailwind CSS
- **State Management**: React hooks
- **Data Persistence**: Local Storage

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- pnpm (v7 or higher)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
cd task-manager
npm install
```

3. Start the development server:

```bash
npm dev
```

4. Open your browser and navigate to `http://localhost:3000`

## License

This project is licensed under the MIT License.
