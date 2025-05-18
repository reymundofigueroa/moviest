--  ===================================
-- Create Foreign Keys Favoritos
-- ====================================

USE Moviest_DB
GO

ALTER TABLE Favorites
ADD CONSTRAINT FK_Favorites_Users
    FOREIGN KEY (UserId)
    REFERENCES Users(id);
GO

ALTER TABLE Favorites
ADD CONSTRAINT FK_Favorites_Contents
    FOREIGN KEY (ContentId)
    REFERENCES Contents(id);
GO

-- ==================================
-- Create Foreign Key Contenidos
-- ==================================

ALTER TABLE Contents
ADD CONSTRAINT FK_Contents_Categories
    FOREIGN KEY (Genre)
    REFERENCES Categories(id);
GO
