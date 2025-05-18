CREATE PROCEDURE GetFavoritesByUser
    @UserId INT
AS
BEGIN
    SELECT C.*
    FROM dbo.Favorites F
    INNER JOIN dbo.Contents C ON F.ContentId = C.id
    WHERE F.UserId = @UserId
    ORDER BY C.Title;
END;
GO
