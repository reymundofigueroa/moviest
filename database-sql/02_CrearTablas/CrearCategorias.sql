-- =========================================
-- Create table Categories
-- =========================================
USE Moviest_DB;
GO



IF OBJECT_ID('dbo.Categories', 'U') IS NOT NULL
BEGIN
    DROP TABLE dbo.Categories;
END
GO

CREATE TABLE dbo.Categories
(
    id INT IDENTITY(1,1) NOT NULL,
    CategoryName NVARCHAR(50) NOT NULL,

    CONSTRAINT PK_Categories PRIMARY KEY (id),
    CONSTRAINT UQ_Categories_Name UNIQUE (CategoryName)
);
GO


