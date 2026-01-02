-- SQL script to clear all locked documents from the database
-- This fixes the SQL query error caused by malformed queries in Payload's document locking feature
-- 
-- Run this directly in your PostgreSQL database using psql or your database client:
-- psql -d your_database_name -f src/scripts/clear-locked-documents.sql

DELETE FROM payload_locked_documents;

-- Verify the table is empty
SELECT COUNT(*) FROM payload_locked_documents;


