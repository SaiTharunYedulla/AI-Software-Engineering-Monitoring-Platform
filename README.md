# AI Software Engineering Monitoring Platform

## Overview

This is a monorepo for the AI Software Engineering Monitoring Platform. The project is organized into two main workspaces:

- **backend**: Express.js API server with TypeScript
- **frontend**: Next.js 14+ application with TypeScript

## Project Structure

```
.
├── backend/                 # Backend API server
│   ├── src/                # Source code
│   ├── package.json        # Backend dependencies
│   └── tsconfig.json       # TypeScript configuration
├── frontend/               # Frontend Next.js application
│   ├── app/               # Next.js App Router
│   ├── package.json       # Frontend dependencies
│   └── tsconfig.json      # TypeScript configuration
├── package.json           # Root workspace configuration
└── README.md             # This file
```

## Prerequisites

- Node.js >= 20.0.0
- npm >= 10.0.0

## Getting Started

### Install Dependencies

```bash
# Install all workspace dependencies
npm install
```

### Development

```bash
# Run both backend and frontend in development mode
npm run dev

# Run backend only
npm run dev:backend

# Run frontend only
npm run dev:frontend
```

### Build

```bash
# Build all workspaces
npm run build

# Build backend only
npm run build:backend

# Build frontend only
npm run build:frontend
```

### Testing

```bash
# Run tests in all workspaces
npm test
```

### Linting

```bash
# Lint all workspaces
npm run lint
```

## Workspace Management

This project uses npm workspaces to manage the monorepo. Each workspace (backend and frontend) has its own `package.json` and can be developed independently.

### Adding Dependencies

```bash
# Add dependency to backend
npm install <package> --workspace=backend

# Add dependency to frontend
npm install <package> --workspace=frontend

# Add dev dependency to root
npm install <package> -D
```

## Module 1: Project Setup & Repository Integration

This module establishes the foundational infrastructure for the platform, including:

- GitHub OAuth authentication
- Multi-project management
- Repository integration
- Automatic webhook configuration
- Event storage and queue-based processing
- Real-time updates via Socket.IO

## Technology Stack

### Backend
- Node.js 20+
- Express.js
- TypeScript
- PostgreSQL (Supabase)
- Redis
- BullMQ
- Socket.IO
- Octokit

### Frontend
- Next.js 14+
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Query
- Zustand
- Socket.IO Client

## License

MIT
