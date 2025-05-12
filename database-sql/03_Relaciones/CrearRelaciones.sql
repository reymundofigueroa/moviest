--  ===================================
-- Create Foreign Keys Favoritos
-- ====================================

USE Moviest_DB
GO

ALTER TABLE Favoritos
ADD CONSTRAINT FK_Favorites_Users
    FOREIGN KEY (UserId)
    REFERENCES Usuarios(id);
GO

ALTER TABLE Favoritos
ADD CONSTRAINT FK_Favorites_Contents
    FOREIGN KEY (ContentId)
    REFERENCES Contenidos(id);
GO

-- ==================================
-- Create Foreign Key Contenidos
-- ==================================

ALTER TABLE Contenidos
ADD CONSTRAINT FK_Contents_Categories
    FOREIGN KEY (Genre)
    REFERENCES Categorias(id);
GO
