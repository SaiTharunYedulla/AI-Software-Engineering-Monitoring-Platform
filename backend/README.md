# Backend API Server

Express.js API server for the AI Software Engineering Monitoring Platform.

## Structure

```
src/
├── modules/           # Feature modules (auth, projects, repositories, webhooks, queue)
├── integrations/      # External service integrations (GitHub, Supabase)
├── sockets/          # Socket.IO real-time communication
├── middleware/       # Express middleware
├── utils/           # Utility functions
├── configs/         # Configuration modules
├── types/           # TypeScript type definitions
├── app.ts          # Express app initialization
├── server.ts       # HTTP server entry point
└── worker.ts       # Queue worker entry point
```

## Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Run worker in development mode
npm run worker:dev

# Build for production
npm run build

# Run in production
npm start
```

## Environment Variables

See `.env.example` for required environment variables.

## Architecture

The backend follows a modular architecture with clear separation of concerns:

- **Routes**: Define API endpoints
- **Controllers**: Handle HTTP requests/responses
- **Services**: Implement business logic
- **Repositories**: Handle database operations
- **Validators**: Validate request data using Zod

## Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```
