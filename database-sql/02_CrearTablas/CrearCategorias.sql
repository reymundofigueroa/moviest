-- =========================================
-- Create table Categories
-- =========================================
USE Moviest_DB
GO

IF OBJECT_ID('dbo.Categorias', 'U') IS NOT NULL
  DROP TABLE dbo.Categorias
GO

CREATE TABLE dbo.Categorias
(
	id INT IDENTITY(1,1) NOT NULL,
	CategoryName NVARCHAR(50) NOT NULL,

  CONSTRAINT PK_Categorias PRIMARY KEY (id)
)
GO
