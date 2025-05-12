-- =========================================
-- Create table Favorites
-- =========================================
USE Moviest_DB
GO

IF OBJECT_ID('dbo.Favoritos', 'U') IS NOT NULL
  DROP TABLE dbo.Favoritos
GO

CREATE TABLE dbo.Favoritos
(
	UserId INT NOT NULL, 
	ContentId INT NOT NULL, 
)
GO
