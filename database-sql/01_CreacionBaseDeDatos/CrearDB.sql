-- =============================================
-- Create database template
-- =============================================
USE master
GO

-- Drop the database if it already exists
IF  EXISTS (
	SELECT name 
		FROM sys.databases 
		WHERE name = N'Moviest_DB'
)
DROP DATABASE Moviest_DB
GO

CREATE DATABASE Moviest_DB
GO
