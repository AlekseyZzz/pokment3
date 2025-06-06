-- Create database
CREATE DATABASE poker_mentor;

-- Connect to the database
\c poker_mentor;

-- Create tables (these will be auto-created by Hibernate, but here for reference)

-- Sessions table
CREATE TABLE IF NOT EXISTS sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    game_type VARCHAR(20) NOT NULL,
    stakes VARCHAR(50),
    duration INTEGER,
    performance_grade VARCHAR(1),
    mental_state TEXT,
    energy_level INTEGER,
    profit DECIMAL(10,2),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Hands table
CREATE TABLE IF NOT EXISTS hands (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
    description TEXT,
    initial_thought TEXT,
    adaptive_thought TEXT,
    for_arguments TEXT,
    against_arguments TEXT,
    spot_type VARCHAR(50),
    position VARCHAR(50),
    priority VARCHAR(10),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Hand tags table
CREATE TABLE IF NOT EXISTS hand_tags (
    hand_id UUID NOT NULL REFERENCES hands(id) ON DELETE CASCADE,
    tag VARCHAR(100) NOT NULL,
    PRIMARY KEY (hand_id, tag)
);

-- Goals table
CREATE TABLE IF NOT EXISTS goals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    deadline DATE,
    progress INTEGER DEFAULT 0,
    category VARCHAR(20) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tasks table
CREATE TABLE IF NOT EXISTS tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    goal_id UUID NOT NULL REFERENCES goals(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_sessions_created_at ON sessions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_hands_session_id ON hands(session_id);
CREATE INDEX IF NOT EXISTS idx_hands_created_at ON hands(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_goals_category ON goals(category);
CREATE INDEX IF NOT EXISTS idx_tasks_goal_id ON tasks(goal_id);