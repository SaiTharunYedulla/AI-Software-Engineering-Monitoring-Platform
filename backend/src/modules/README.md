# Modules

This directory contains feature modules for the backend application.

## Structure

Each module follows a consistent structure:

```
module-name/
├── module-name.routes.ts      # API route definitions
├── module-name.controller.ts  # Request/response handlers
├── module-name.service.ts     # Business logic
├── module-name.repository.ts  # Database operations
├── module-name.validator.ts   # Request validation schemas
└── module-name.types.ts       # TypeScript types
```

## Modules

- **auth**: Authentication and authorization
- **projects**: Project management
- **repositories**: Repository management
- **webhooks**: Webhook processing
- **queue**: Background job processing
