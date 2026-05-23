# Store

This directory contains Zustand state management stores.

## Stores

- **auth.store.ts**: Authentication state
- **projects.store.ts**: Project state
- **ui.store.ts**: UI state (modals, toasts, theme)

## Guidelines

- Use Zustand for client-side state management
- Keep stores focused on specific domains
- Use React Query for server state (API data)
- Export stores as named exports
