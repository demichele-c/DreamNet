-- Create the database
CREATE DATABASE dreamnet;

-- Switch to the new database
\c dreamnet

-- Create the Users table
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL
);

-- Add any other tables you might need
-- For example:
-- CREATE TABLE Dreams (
--     id SERIAL PRIMARY KEY,
--     user_id INTEGER REFERENCES Users(id),
--     content TEXT NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- CREATE TABLE Insights (
--     id SERIAL PRIMARY KEY,
--     user_id INTEGER REFERENCES Users(id),
--     insight TEXT NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );
