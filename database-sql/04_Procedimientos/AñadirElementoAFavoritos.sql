USE Moviest_DB
GO

IF OBJECT_ID('dbo.AgregarFavoritoProc', 'P') IS NOT NULL
    DROP PROCEDURE dbo.AgregarFavoritoProc
GO

CREATE PROCEDURE dbo.AgregarFavoritoProc
    @UserId INT,
    @ContentId INT
AS
BEGIN
    SET NOCOUNT ON;

    -- Validar que el usuario existe
    IF NOT EXISTS (SELECT 1 FROM Usuarios WHERE id = @UserId)
    BEGIN
        RAISERROR('El usuario no existe.', 16, 1);
        RETURN;
    END

    -- Validar que el contenido existe
    IF NOT EXISTS (SELECT 1 FROM Contenidos WHERE id = @ContentId)
    BEGIN
        RAISERROR('El contenido no existe.', 16, 1);
        RETURN;
    END

    -- Validar que no existe ya en favoritos (evitar duplicados)
    IF EXISTS (SELECT 1 FROM Favoritos WHERE UserId = @UserId AND ContentId = @ContentId)
    BEGIN
        RAISERROR('El contenido ya está en favoritos.', 16, 1);
        RETURN;
    END

    -- Insertar en favoritos
    INSERT INTO Favoritos (UserId, ContentId)
    VALUES (@UserId, @ContentId);
END
GO
