# Database Migrations

This directory contains SQL migration scripts for database schema management.

## Migrations

- **001_initial_schema.sql**: Initial database schema (users, projects, repositories, webhook_events)

## Running Migrations

Migrations should be run against your Supabase PostgreSQL database using the Supabase CLI or SQL editor.

```bash
# Using Supabase CLI
supabase db push

# Or manually execute SQL files in Supabase SQL Editor
```

## Migration Naming Convention

Migrations follow the pattern: `{number}_{description}.sql`

Example: `001_initial_schema.sql`, `002_add_user_preferences.sql`
