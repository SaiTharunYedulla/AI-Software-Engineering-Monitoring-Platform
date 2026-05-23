# Features

This directory contains feature modules with hooks and services.

## Structure

Each feature module contains:

```
feature-name/
├── hooks/           # React hooks for the feature
│   └── useFeature.ts
└── services/        # API service functions
    └── feature.service.ts
```

## Features

- **auth**: Authentication and session management
- **projects**: Project CRUD operations
- **repositories**: Repository search and connection
- **realtime**: Socket.IO real-time updates

## Guidelines

- Hooks should use React Query for data fetching
- Services should use the API client from `lib/api-client.ts`
- Keep business logic in services, not hooks
- Export hooks and services as named exports
