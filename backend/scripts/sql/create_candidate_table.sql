-- Creates the candidate table (idempotent).
-- Run via: npm run db:create-candidate-table (from backend/)

CREATE TABLE IF NOT EXISTS candidate (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    education TEXT,
    job_exp TEXT,
    resume BYTEA,
    CONSTRAINT candidate_email_key UNIQUE (email)
);
