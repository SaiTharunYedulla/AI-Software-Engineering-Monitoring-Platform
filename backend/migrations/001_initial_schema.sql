-- ============================================================================
-- Initial Schema Migration
-- ============================================================================
-- This script creates the initial database schema for the application.
-- It defines the core tables, relationships, indexes, and constraints.
--
-- Tables created:
--   - users: Stores user information and authentication details.
--   - projects: Stores user-created projects.
--   - repositories: Stores GitHub repositories connected to projects.
--   - webhook_events: Stores incoming webhook events from GitHub.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- Table: users
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    github_id BIGINT UNIQUE NOT NULL,
    username TEXT NOT NULL,
    avatar_url TEXT,
    email TEXT,
    github_access_token TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_users_github_id ON users(github_id);
COMMENT ON TABLE users IS 'Stores user information and authentication details from GitHub.';

-- ----------------------------------------------------------------------------
-- Table: projects
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
COMMENT ON TABLE projects IS 'Stores user-created projects to group repositories.';

-- ----------------------------------------------------------------------------
-- Table: repositories
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS repositories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    github_repo_id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    private BOOLEAN NOT NULL,
    owner_login VARCHAR(255) NOT NULL,
    webhook_id BIGINT,
    webhook_secret TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    UNIQUE(project_id, github_repo_id)
);

CREATE INDEX IF NOT EXISTS idx_repositories_project_id ON repositories(project_id);
CREATE INDEX IF NOT EXISTS idx_repositories_github_repo_id ON repositories(github_repo_id);
COMMENT ON TABLE repositories IS 'Stores GitHub repositories connected to projects.';

-- ----------------------------------------------------------------------------
-- Table: webhook_events
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS webhook_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    repository_id UUID NOT NULL REFERENCES repositories(id) ON DELETE CASCADE,
    github_delivery_id UUID NOT NULL UNIQUE,
    event_type VARCHAR(100) NOT NULL,
    payload JSONB NOT NULL,
    processed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_webhook_events_repository_id ON webhook_events(repository_id);
CREATE INDEX IF NOT EXISTS idx_webhook_events_event_type ON webhook_events(event_type);
COMMENT ON TABLE webhook_events IS 'Stores incoming webhook events from GitHub for processing.';

-- ============================================================================
-- End of Migration
-- ============================================================================
