USE Moviest_DB
GO

IF OBJECT_ID('dbo.InsertCategoryProc', 'P') IS NOT NULL
    DROP PROCEDURE dbo.InsertCategoryProc
GO

CREATE PROCEDURE dbo.InsertCategoryProc
    @CategoryName NVARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;

    -- Validar si ya existe la categoría
    IF EXISTS (SELECT 1 FROM Categories WHERE CategoryName = @CategoryName)
    BEGIN
        RAISERROR('La categoría ya existe.', 16, 1);
        RETURN;
    END

    -- Insertar la categoría
    INSERT INTO Categories (CategoryName)
    VALUES (@CategoryName);
END
GO
