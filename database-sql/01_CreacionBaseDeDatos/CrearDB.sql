USE master;
GO

-- Forzar modo de usuario único y cerrar conexiones activas si la base existe
IF EXISTS (
    SELECT name 
    FROM sys.databases 
    WHERE name = N'Moviest_DB'
)
BEGIN
    ALTER DATABASE Moviest_DB SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE Moviest_DB;
END
GO

-- Crear la base de datos desde cero
CREATE DATABASE Moviest_DB;
GO
