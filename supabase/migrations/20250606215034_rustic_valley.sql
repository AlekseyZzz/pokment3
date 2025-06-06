/*
  # Poker Mentor Database Schema

  1. New Tables
    - `sessions` - Store poker session data with performance metrics
    - `hands` - Store individual hand analysis data linked to sessions
    - `hand_tags` - Store tags for hands (many-to-many relationship)
    - `goals` - Store user goals and objectives
    - `tasks` - Store tasks associated with goals

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data

  3. Indexes
    - Performance optimized indexes for common queries
    - Foreign key relationships properly indexed
*/

-- Sessions table
CREATE TABLE IF NOT EXISTS sessions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    game_type varchar(20) NOT NULL,
    stakes varchar(50),
    duration integer,
    performance_grade varchar(1),
    mental_state text,
    energy_level integer,
    profit decimal(10,2),
    mental_profiles jsonb DEFAULT '[]'::jsonb,
    dominant_profile varchar(20),
    emotional_data jsonb,
    pre_session_data jsonb,
    reset_data jsonb,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Hands table
CREATE TABLE IF NOT EXISTS hands (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id uuid NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
    description text,
    initial_thought text,
    adaptive_thought text,
    for_arguments text,
    against_arguments text,
    spot_type varchar(50),
    position varchar(50),
    priority varchar(10),
    screenshot_url text,
    theory_attachments jsonb DEFAULT '[]'::jsonb,
    created_at timestamptz NOT NULL DEFAULT now()
);

-- Hand tags table
CREATE TABLE IF NOT EXISTS hand_tags (
    hand_id uuid NOT NULL REFERENCES hands(id) ON DELETE CASCADE,
    tag varchar(100) NOT NULL,
    PRIMARY KEY (hand_id, tag)
);

-- Goals table
CREATE TABLE IF NOT EXISTS goals (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    title varchar(255) NOT NULL,
    description text,
    deadline date,
    progress integer DEFAULT 0,
    category varchar(20) NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now()
);

-- Tasks table
CREATE TABLE IF NOT EXISTS tasks (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    goal_id uuid NOT NULL REFERENCES goals(id) ON DELETE CASCADE,
    title varchar(255) NOT NULL,
    completed boolean DEFAULT false,
    created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE hands ENABLE ROW LEVEL SECURITY;
ALTER TABLE hand_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- RLS Policies for sessions
CREATE POLICY "Users can read own sessions"
    ON sessions
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sessions"
    ON sessions
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own sessions"
    ON sessions
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own sessions"
    ON sessions
    FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);

-- RLS Policies for hands
CREATE POLICY "Users can read own hands"
    ON hands
    FOR SELECT
    TO authenticated
    USING (
        session_id IN (
            SELECT id FROM sessions WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert hands to own sessions"
    ON hands
    FOR INSERT
    TO authenticated
    WITH CHECK (
        session_id IN (
            SELECT id FROM sessions WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update own hands"
    ON hands
    FOR UPDATE
    TO authenticated
    USING (
        session_id IN (
            SELECT id FROM sessions WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can delete own hands"
    ON hands
    FOR DELETE
    TO authenticated
    USING (
        session_id IN (
            SELECT id FROM sessions WHERE user_id = auth.uid()
        )
    );

-- RLS Policies for hand_tags
CREATE POLICY "Users can read own hand tags"
    ON hand_tags
    FOR SELECT
    TO authenticated
    USING (
        hand_id IN (
            SELECT h.id FROM hands h
            JOIN sessions s ON h.session_id = s.id
            WHERE s.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert tags to own hands"
    ON hand_tags
    FOR INSERT
    TO authenticated
    WITH CHECK (
        hand_id IN (
            SELECT h.id FROM hands h
            JOIN sessions s ON h.session_id = s.id
            WHERE s.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can delete own hand tags"
    ON hand_tags
    FOR DELETE
    TO authenticated
    USING (
        hand_id IN (
            SELECT h.id FROM hands h
            JOIN sessions s ON h.session_id = s.id
            WHERE s.user_id = auth.uid()
        )
    );

-- RLS Policies for goals
CREATE POLICY "Users can read own goals"
    ON goals
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own goals"
    ON goals
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own goals"
    ON goals
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own goals"
    ON goals
    FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);

-- RLS Policies for tasks
CREATE POLICY "Users can read own tasks"
    ON tasks
    FOR SELECT
    TO authenticated
    USING (
        goal_id IN (
            SELECT id FROM goals WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert tasks to own goals"
    ON tasks
    FOR INSERT
    TO authenticated
    WITH CHECK (
        goal_id IN (
            SELECT id FROM goals WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update own tasks"
    ON tasks
    FOR UPDATE
    TO authenticated
    USING (
        goal_id IN (
            SELECT id FROM goals WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can delete own tasks"
    ON tasks
    FOR DELETE
    TO authenticated
    USING (
        goal_id IN (
            SELECT id FROM goals WHERE user_id = auth.uid()
        )
    );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_created_at ON sessions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_hands_session_id ON hands(session_id);
CREATE INDEX IF NOT EXISTS idx_hands_created_at ON hands(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_goals_user_id ON goals(user_id);
CREATE INDEX IF NOT EXISTS idx_goals_category ON goals(category);
CREATE INDEX IF NOT EXISTS idx_tasks_goal_id ON tasks(goal_id);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for sessions table
CREATE TRIGGER update_sessions_updated_at
    BEFORE UPDATE ON sessions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();