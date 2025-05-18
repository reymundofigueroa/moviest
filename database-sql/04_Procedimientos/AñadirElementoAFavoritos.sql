USE Moviest_DB
GO

IF OBJECT_ID('dbo.AddFavoriteProc', 'P') IS NOT NULL
    DROP PROCEDURE dbo.AddFavoriteProc
GO

CREATE PROCEDURE dbo.AddFavoriteProc
    @UserId INT,
    @ContentId INT
AS
BEGIN
    SET NOCOUNT ON;

    -- Validar que el usuario existe
    IF NOT EXISTS (SELECT 1 FROM Users WHERE id = @UserId)
    BEGIN
        RAISERROR('El usuario no existe.', 16, 1);
        RETURN;
    END

    -- Validar que el contenido existe
    IF NOT EXISTS (SELECT 1 FROM Contents WHERE id = @ContentId)
    BEGIN
        RAISERROR('El contenido no existe.', 16, 1);
        RETURN;
    END

    -- Validar que no existe ya en favoritos (evitar duplicados)
    IF EXISTS (SELECT 1 FROM Favorites WHERE UserId = @UserId AND ContentId = @ContentId)
    BEGIN
        RAISERROR('El contenido ya está en favoritos.', 16, 1);
        RETURN;
    END

    -- Insertar en favoritos
    INSERT INTO Favorites (UserId, ContentId)
    VALUES (@UserId, @ContentId);
END
GO
