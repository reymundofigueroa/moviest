-- =========================================
-- Create table Users
-- =========================================
USE Moviest_DB
GO

IF OBJECT_ID('dbo.Usuarios', 'U') IS NOT NULL
  DROP TABLE dbo.Usuarios
GO

CREATE TABLE dbo.Usuarios
(
	id INT IDENTITY(1,1) NOT NULL, 
	UserName NVARCHAR(200) NOT NULL, 
	Email NVARCHAR(200) NOT NULL,
  PasswordHash NVARCHAR(256) NOT NULL,
  BirthDate DATE,
  RegistrationDate DATETIME2 DEFAULT SYSDATETIME(),

  CONSTRAINT PK_Usuarios PRIMARY KEY (id),
  CONSTRAINT UQ_Email UNIQUE (Email),
)
GO
