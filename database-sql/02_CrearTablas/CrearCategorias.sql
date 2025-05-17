-- =========================================
-- Create table Categories
-- =========================================
USE Moviest_DB;
GO

IF OBJECT_ID('FK_Contents_Categories', 'F') IS NOT NULL
BEGIN
    ALTER TABLE Contenidos
    DROP CONSTRAINT FK_Contents_Categories;
END
GO

IF OBJECT_ID('dbo.Categorias', 'U') IS NOT NULL
BEGIN
    DROP TABLE dbo.Categorias;
END
GO

CREATE TABLE dbo.Categorias
(
    id INT IDENTITY(1,1) NOT NULL,
    CategoryName NVARCHAR(50) NOT NULL,

    CONSTRAINT PK_Categorias PRIMARY KEY (id),
    CONSTRAINT UQ_Categorias_Nombre UNIQUE (CategoryName)
);
GO

ALTER TABLE Contenidos
ADD CONSTRAINT FK_Contents_Categories
    FOREIGN KEY (Genre)
    REFERENCES Categorias(id);
GO
