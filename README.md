# Task Manager

A beautiful component-based task management application built using a monorepo architecture. This project demonstrates how to create reusable UI components and consume them in a web application.

## Project Structure

This project is organized as a monorepo using pnpm workspaces and Turborepo:

```
task-manager/
├── apps/
│   └── web/            # Next.js web application
├── packages/
│   └── ui/             # Reusable UI components
├── package.json        # Root workspace configuration
├── pnpm-workspace.yaml # Workspace definition
└── turbo.json          # Turborepo configuration
```

## Features

- Create, read, update, and delete tasks
- Categorize tasks by priority (low, medium, high)
- Track task status (to do, in progress, completed)
- Set due dates for tasks
- Filter tasks by status
- Responsive design for all device sizes

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
pnpm install
```

3. Start the development server:

```bash
pnpm dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Development

### Adding a new component

1. Create a new component in the `packages/ui/src/components` directory
2. Export it from `packages/ui/src/index.ts`
3. Use it in your application

### Building all packages

```bash
pnpm build
```

## License

This project is licensed under the MIT License.
