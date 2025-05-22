USE Moviest_DB
GO

IF OBJECT_ID('dbo.InsertContentPorc', 'P') IS NOT NULL
    DROP PROCEDURE dbo.InsertContentPorc
GO

CREATE PROCEDURE dbo.InsertContentPorc
    @Title NVARCHAR(150),
    @ContentDescription NVARCHAR(MAX) = NULL,
    @Genre INT = NULL,
    @ContentYear DATE = NULL,
    @Rating DECIMAL(2,1) = NULL,
    @Duration TIME = NULL,
    @CoverImage NVARCHAR(300) = NULL,
    @VideoUrl NVARCHAR(300) = NULL
AS
BEGIN
    -- Evitamos el mensaje de cuantas filas fueron afectadas
    SET NOCOUNT ON;

    INSERT INTO Contents (Title, ContentDescription, Genre, ContentYear, Rating, Duration, CoverImage, VideoUrl)
    VALUES (@Title, @ContentDescription, @Genre, @ContentYear, @Rating, @Duration, @CoverImage, @VideoUrl);
END
GO
