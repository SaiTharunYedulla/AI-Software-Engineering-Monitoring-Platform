# Frontend Application

Next.js 14+ application for the AI Software Engineering Monitoring Platform.

## Structure

```
app/                  # Next.js App Router
├── (auth)/          # Authentication routes
├── (dashboard)/     # Dashboard routes
└── onboarding/      # Onboarding flow

components/          # React components
├── ui/             # shadcn/ui components
├── auth/           # Authentication components
├── dashboard/      # Dashboard components
├── projects/       # Project management components
├── repositories/   # Repository management components
├── layout/         # Layout components
└── common/         # Common/shared components

features/           # Feature modules
├── auth/          # Authentication feature
├── projects/      # Projects feature
├── repositories/  # Repositories feature
└── realtime/      # Real-time updates feature

lib/               # Utility libraries
├── api-client.ts  # API client configuration
├── supabase.ts    # Supabase client
└── utils.ts       # Utility functions

store/             # Zustand state management
├── auth.store.ts
├── projects.store.ts
└── ui.store.ts

types/             # TypeScript type definitions
```

## Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Run production build
npm start
```

## Environment Variables

See `.env.example` for required environment variables.

## Features

- GitHub OAuth authentication
- Multi-project management
- Repository connection and monitoring
- Real-time updates via Socket.IO
- Dark mode support
- Responsive design (mobile, tablet, desktop)

## UI Components

This project uses [shadcn/ui](https://ui.shadcn.com/) for UI components, built on top of Radix UI and Tailwind CSS.

## Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```
