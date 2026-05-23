# PROJECT_CONTEXT.md

# AI Software Engineering Monitoring Platform

====================================================
PROJECT OVERVIEW
====================================================

This project is a production-grade AI Software Engineering Monitoring Platform.

The platform acts as a centralized engineering intelligence system that helps software teams:

- monitor pull requests
- perform AI-powered code analysis
- monitor deployments
- monitor production systems
- analyze logs and metrics
- investigate incidents
- generate engineering insights
- improve software quality

The product MUST resemble a real enterprise SaaS engineering platform similar to:

- GitHub
- Linear
- Datadog
- Sentry
- Vercel
- Grafana

This is NOT a toy project.

The system must be:
- scalable
- modular
- maintainable
- production-oriented
- visually impressive
- developer-focused
- realistic
- portfolio-worthy

====================================================
STRICT NON-GOALS
====================================================

DO NOT IMPLEMENT:

- autonomous AI systems
- AI self-learning engines
- rollback automation
- deployment blocking systems
- knowledge graph systems
- autonomous infrastructure control
- advanced predictive ML systems

Keep the platform practical and realistically buildable.

====================================================
CORE SYSTEMS
====================================================

The platform consists of:

1. Repository & Project Integration
2. Pull Request Monitoring
3. Multi-Agent AI PR Review System
4. Deployment Monitoring
5. Production Monitoring
6. Incident Analysis
7. Notifications & Alerts
8. Engineering Analytics
9. Centralized Dashboard

====================================================
ARCHITECTURE PRINCIPLES
====================================================

The system MUST follow:

- clean architecture
- modular architecture
- service-oriented design
- reusable abstractions
- separation of concerns
- scalable backend patterns
- layered architecture
- centralized observability
- event-driven workflows

====================================================
BACKEND ARCHITECTURE RULES
====================================================

Backend stack:
- Node.js
- Express.js
- PostgreSQL
- Supabase
- Socket.IO
- Docker

Architecture layers MUST be separated:

- routes
- controllers
- services
- repositories
- middleware
- queues
- workers
- validators
- DTOs
- integrations
- monitoring
- logging
- utilities
- configs

NEVER place all logic in controllers.

Controllers should remain thin.

Business logic belongs in services.

Database access belongs in repositories.

====================================================
FRONTEND ARCHITECTURE RULES
====================================================

Frontend stack:
- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Recharts

Frontend requirements:
- responsive layouts
- premium SaaS UI
- reusable components
- loading skeletons
- empty states
- modern sidebar navigation
- dark mode
- real-time updates
- modular feature-based structure

Use Server Components where appropriate.

====================================================
DATABASE RULES
====================================================

Database:
- PostgreSQL via Supabase

Requirements:
- normalized relational schema
- proper indexing
- migrations
- scalable relationships
- foreign key integrity

Core tables:
- users
- organizations
- projects
- repositories
- pull_requests
- ai_reports
- deployments
- incidents
- metrics
- logs
- notifications

Always:
- use indexes where required
- avoid redundant schema design
- separate audit/event tables properly

====================================================
AI SYSTEM RULES
====================================================

AI provider:
- Google Gemini API

AI architecture:
- modular multi-agent system

AI agents:
1. Reviewer Agent
2. Tester Agent
3. Security Auditor Agent
4. Performance Analyzer Agent
5. Documentation Writer Agent

AI requirements:
- structured prompts
- deterministic outputs
- retry handling
- rate-limit handling
- AI orchestration layer
- isolated responsibilities per agent

AI services MUST remain modular.

Never tightly couple AI logic with controllers.

====================================================
QUEUE & BACKGROUND JOB RULES
====================================================

Use queue-based async processing for:
- PR analysis
- webhook processing
- AI review generation
- deployment analysis
- incident processing
- notifications

Requirements:
- retry handling
- dead-letter handling
- job tracking
- queue monitoring

Heavy processing MUST NOT block request lifecycle.

====================================================
WEBHOOK RULES
====================================================

GitHub integration:
- Octokit
- GitHub Actions

Supported events:
- PR opened
- PR synchronized
- PR ready for review
- deployment completed
- deployment failed

Requirements:
- secure webhook verification
- signature validation
- replay attack prevention
- event idempotency
- retry handling

====================================================
MONITORING & OBSERVABILITY RULES
====================================================

Logging:
- Winston or Pino

Metrics:
- Prometheus

Visualization:
- Grafana

Observability requirements:
- centralized logging
- request tracing
- structured logs
- metrics collection
- error tracking
- deployment tracking
- incident correlation

Every critical backend service MUST include logging.

====================================================
REALTIME RULES
====================================================

Realtime:
- Socket.IO

Used for:
- live PR updates
- deployment status
- incident alerts
- dashboard updates

Realtime systems MUST:
- support reconnect handling
- support room/channel isolation
- avoid duplicate event listeners
- maintain scalable socket architecture

====================================================
SECURITY RULES
====================================================

Always implement:
- JWT/session validation
- protected routes
- RBAC authorization
- webhook signature validation
- rate limiting
- secure environment handling
- input validation
- sanitized outputs
- centralized error handling

Never expose:
- secrets
- API keys
- internal stack traces

====================================================
API DESIGN RULES
====================================================

All APIs must follow:
- RESTful conventions
- versioned routes
- consistent response structures
- proper HTTP status codes
- centralized error responses

Example:
- /api/v1/projects
- /api/v1/pull-requests

API responses should include:
- success
- data
- error
- metadata

====================================================
CODE QUALITY RULES
====================================================

Always:
- use TypeScript
- prefer async/await
- avoid duplicate logic
- create reusable abstractions
- use DTO validation
- implement centralized error handling
- use environment variables
- write modular code
- maintain consistent naming

Never:
- create giant files
- mix responsibilities
- hardcode secrets
- tightly couple services

====================================================
FOLDER STRUCTURE RULES
====================================================

Backend should follow modular structure:

backend/
  src/
    modules/
    routes/
    controllers/
    services/
    repositories/
    middleware/
    queues/
    workers/
    integrations/
    monitoring/
    validators/
    utils/
    configs/
    sockets/
    types/

Frontend should follow feature-driven structure:

frontend/
  app/
  components/
  features/
  hooks/
  services/
  store/
  lib/
  types/

====================================================
DOCUMENTATION RULES
====================================================

Every feature implementation MUST update documentation.

Maintain:

/docs
  ARCHITECTURE.md
  FEATURES.md
  API_REFERENCE.md
  DATABASE_SCHEMA.md
  CHANGELOG.md
  KNOWN_ISSUES.md
  FUTURE_REQUIREMENTS.md
  DECISIONS.md
  DEPLOYMENT.md
  SECURITY.md
  MONITORING.md

Whenever code changes:
- update affected docs
- update architecture if flow changes
- update API docs if APIs change
- update changelog
- document assumptions and technical debt

Documentation updates are mandatory.

====================================================
IMPLEMENTATION RULES
====================================================

Before generating code ALWAYS:

1. Analyze architecture
2. Read documentation
3. Understand dependencies
4. Preserve conventions
5. Identify impacted modules
6. Consider scalability implications
7. Consider observability implications
8. Consider security implications

NEVER directly jump into code generation.

FIRST provide:
- architecture plan
- impacted files
- implementation steps
- edge cases
- scalability considerations

THEN generate implementation.

====================================================
TOKEN OPTIMIZATION RULES
====================================================

When implementing features:
- analyze only impacted modules
- avoid re-reading entire codebase
- focus only on relevant files
- preserve existing abstractions
- avoid generating duplicate code

Prefer incremental implementation over full rewrites.

====================================================
DEPLOYMENT RULES
====================================================

Frontend deployment:
- Vercel

Backend deployment:
- Render

Containers:
- Docker
- docker-compose

Deployment requirements:
- production-ready Dockerfiles
- environment separation
- health checks
- scalable configs

====================================================
FINAL ENGINEERING GOAL
====================================================

Build a realistic enterprise-grade AI engineering operations platform that software teams could genuinely use for:

- PR reviews
- deployment monitoring
- production observability
- incident analysis
- engineering analytics

The system should feel like a real startup-quality SaaS platform with:
- scalable backend systems
- modern frontend UX
- production-grade architecture
- maintainable engineering design
- modular services
- enterprise-style observability
- polished dashboards
- developer-focused workflows