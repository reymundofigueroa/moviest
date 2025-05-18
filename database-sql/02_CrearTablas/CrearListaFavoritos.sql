-- =========================================
-- Create table Favorites
-- =========================================
USE Moviest_DB
GO

IF OBJECT_ID('dbo.Favoritos', 'U') IS NOT NULL
  DROP TABLE dbo.Favorites
GO

CREATE TABLE dbo.Favorites
(
	UserId INT NOT NULL, 
	ContentId INT NOT NULL, 
)
GO
