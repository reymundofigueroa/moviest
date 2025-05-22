-- De momento no funciona el script debido a deferencias en el algoritmo de encriptación usados aquí y en la API

USE Moviest_DB
GO

DECLARE @Password NVARCHAR(100) = '';

DECLARE @HashedPassword VARBINARY(64);

SET @HashedPassword = HASHBYTES('SHA2_256', CONVERT(VARBINARY(100), @Password));

INSERT INTO Users(UserName, Email, PasswordHash, BirthDate)
  VALUES ('Reymundo', 'reymundo@gmail.com', @HashedPassword, '2000-02-20');


  SELECT * FROM Users

