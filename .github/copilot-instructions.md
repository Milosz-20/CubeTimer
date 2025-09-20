# CubeTimer Copilot Instructions

## Project Overview

CubeTimer is a Rubik's cube timing application built as a **Bun-based monorepo**
with TurboRepo orchestration. The architecture separates concerns between a
**NestJS backend** (`apps/server`) handling authentication, timing data, and
notifications, and a **React frontend** (`apps/web`) providing the timer
interface and solve tracking.

## Architecture & Key Patterns

### Monorepo Structure

- **Package Manager**: Bun (v1.2.13) - use `bun add --cwd apps/web` or
  `bun add --cwd apps/server` for dependencies
- **Build System**: TurboRepo with shared tasks (`turbo run dev`,
  `turbo run build`)
- **Development**: Run `turbo run dev` from root to start both apps
  simultaneously

### Backend (NestJS + Prisma)

- **Database**: PostgreSQL with Prisma ORM, schema in
  `apps/server/prisma/schema.prisma`
- **Generated Client**: Custom output path `../generated/prisma` (not default
  node_modules)
- **Auth Pattern**: JWT with cookie-based sessions, Argon2 password hashing
- **Key Models**: `User`, `Session`, `Solve`, `Notification` with cascade
  deletes
- **Custom Decorators**: Use `@GetUser()` decorator for authenticated routes
  (see `apps/server/src/auth/decorator/`)

### Frontend (React + Redux)

- **State Management**: Redux Toolkit with RTK Query for API calls
- **API Integration**: Uses `baseQueryWithAuth` with automatic 401 handling and
  logout
- **Component Structure**: Feature-based modules (`TimerModule`, `SolvesBlock`,
  `StatsBlock`) with co-located hooks and styles
- **Path Aliases**: `@app/`, `@features/`, `@store/`, `@hooks/`, `@utils/` (see
  tsconfig paths)

## Critical Developer Workflows

### Database Operations

```bash
# Test database management (Windows PowerShell specific)
bun run db:test:restart        # Runs PowerShell script for Docker setup
bun run pretest:e2e           # Auto-restarts test DB before e2e tests
bunx dotenv -e .env.test -- prisma migrate deploy  # Migration with env file
```

### Testing Patterns

- **E2E Tests**: Require Docker PostgreSQL container on port 5434 (`test-db`
  service)
- **Test DB Script**: `scripts/test-db-restart.ps1` handles full Docker
  lifecycle with hardcoded Windows Docker path
- **Test Configuration**: Uses separate `.env.test` file with `bunx dotenv`
  wrapper

### API Development

- **Controller Pattern**: Protected routes use `@UseGuards(JwtGuard)` +
  `@GetUser()` decorator
- **Error Handling**: Prisma errors caught and converted to NestJS HTTP
  exceptions
- **Response Format**: JWT tokens returned from auth endpoints for cookie
  setting

## Project-Specific Conventions

### Cube Timer Domain Logic

- **Scramble Generation**: Frontend generates scrambles per cube type (3x3, 4x4,
  etc.)
- **Timing Data**: Stored in milliseconds with optional penalty/DNF flags
- **Sessions**: Grouping mechanism for solves with cube type specification
- **Notifications**: User-to-user system with variant types (success, error,
  warning, info)

### State Management Patterns

- **Timer State**: Redux slice manages scramble locking, timing states
- **API Caching**: RTK Query with `tagTypes: ['User', 'Solve']` for invalidation
- **Auth Flow**: Automatic logout on 401 responses, user state clearing

### File Organization

- **Backend**: Module per domain (`auth/`, `user/`) with co-located DTOs,
  guards, strategies
- **Frontend**: Feature modules contain `components/`, `hooks/`, `index.ts`, and
  CSS modules
- **Shared Types**: User types in `apps/web/src/types/` directory

## Integration Points

### API Communication

- **Base URL**: `http://localhost:3333/api` (hardcoded in baseQuery)
- **Credentials**: `include` for cookie-based auth
- **Error Boundary**: Global 401 handling with state reset

### Database Schema Notes

- **User System**: Username/email dual login, optional nickname display
- **Solve Tracking**: Links to user and optional session, includes scramble text
- **Notification System**: Bidirectional user relations (sender/receiver)

## Development Notes

- **Docker**: Test database uses specific Windows Docker path in PowerShell
  script
- **TypeScript**: Shared base config with project-specific extensions
- **Linting**: ESLint configs per app with shared rules at root level
- **Hot Reload**: Both apps support watch mode via TurboRepo dev task
