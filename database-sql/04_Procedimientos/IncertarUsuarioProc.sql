USE Moviest_DB
GO

IF OBJECT_ID('dbo.InsertarUsuarioProc', 'P') IS NOT NULL
  DROP PROCEDURE dbo.InsertarUsuarioProc
GO

CREATE PROCEDURE dbo.InsertarUsuarioProc
  @UserName NVARCHAR(200),
  @Email NVARCHAR(200),
  @PasswordHash NVARCHAR(256),
  @BirthDate DATE = NULL
AS
BEGIN
  -- Evitamos el mensaje de cuantas filas fueron afectadas
  SET NOCOUNT ON;

  -- Verificar si el correo ya existe
  IF EXISTS (SELECT 1 FROM Usuarios WHERE Email = @Email)
  BEGIN
    RAISERROR('El correo electrónico ya está registrado.', 16, 1);
    RETURN;
  END

  INSERT INTO Usuarios(UserName, Email, PasswordHash, BirthDate)
  VALUES (@UserName, @Email, @PasswordHash, @BirthDate)
END

GO
