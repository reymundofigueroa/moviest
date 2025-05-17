USE Moviest_DB
GO

IF OBJECT_ID('dbo.InsertarCategoriaProc', 'P') IS NOT NULL
    DROP PROCEDURE dbo.InsertarCategoriaProc
GO

CREATE PROCEDURE dbo.InsertarCategoriaProc
    @CategoryName NVARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;

    -- Validar si ya existe la categoría
    IF EXISTS (SELECT 1 FROM Categorias WHERE CategoryName = @CategoryName)
    BEGIN
        RAISERROR('La categoría ya existe.', 16, 1);
        RETURN;
    END

    -- Insertar la categoría
    INSERT INTO Categorias (CategoryName)
    VALUES (@CategoryName);
END
GO
