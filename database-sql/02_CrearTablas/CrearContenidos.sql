-- =========================================
-- Create table Contents
-- =========================================
USE Moviest_DB
GO

IF OBJECT_ID('dbo.Contents', 'U') IS NOT NULL
  DROP TABLE dbo.Contents
GO

CREATE TABLE dbo.Contents
(
	id INT IDENTITY(1,1) NOT NULL, 
	Title NVARCHAR(150) NOT NULL, 
	ContentDescription NVARCHAR(MAX) NULL,
	CategoryId INT NOT NULL,
	ContentYear DATE NULL,
	Rating DECIMAL(2,1) NULL,
	Duration TIME NULL,
	CoverImage NVARCHAR(300) NULL,
	VideoUrl NVARCHAR(300) NULL,

	CONSTRAINT PK_Contents_Table PRIMARY KEY (id),
	
);
GO
