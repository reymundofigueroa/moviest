-- Inserción de películas (ContentType = 'M')
INSERT INTO dbo.Contents (Title, ContentDescription, ContentType, CategoryId, ContentYear, Rating, Duration, CoverImage, VideoUrl)
VALUES
('Inception', 'Un ladrón que roba secretos corporativos mediante el uso de la tecnología de los sueños.', 'M', 1, '2010-07-16', 8.8, '02:28:00', 'https://example.com/inception.jpg', 'https://example.com/inception.mp4'),
('The Dark Knight', 'Batman enfrenta al Joker, un criminal que busca sumir a Gotham en el caos.', 'M', 2, '2008-07-18', 9.0, '02:32:00', 'https://example.com/darkknight.jpg', 'https://example.com/darkknight.mp4'),
('Interstellar', 'Un grupo de astronautas viaja a través de un agujero de gusano en busca de un nuevo hogar para la humanidad.', 'M', 3, '2014-11-07', 8.6, '02:49:00', 'https://example.com/interstellar.jpg', 'https://example.com/interstellar.mp4'),
('The Matrix', 'Un hacker descubre la verdad detrás de la realidad simulada controlada por máquinas.', 'M', 1, '1999-03-31', 8.7, '02:16:00', 'https://example.com/matrix.jpg', 'https://example.com/matrix.mp4'),
('Gladiator', 'Un general romano busca vengarse del emperador corrupto que mató a su familia.', 'M', 2, '2000-05-05', 8.5, '02:35:00', 'https://example.com/gladiator.jpg', 'https://example.com/gladiator.mp4'),
('La La Land', 'Un músico y una actriz persiguen sus sueños en Los Ángeles mientras navegan su relación.', 'M', 3, '2016-12-09', 8.0, '02:08:00', 'https://example.com/lalaland.jpg', 'https://example.com/lalaland.mp4');

-- Inserción de series (ContentType = 'S')
INSERT INTO dbo.Contents (Title, ContentDescription, ContentType, CategoryId, ContentYear, Rating, Duration, CoverImage, VideoUrl)
VALUES
('Stranger Things', 'Un niño desaparece en un pequeño pueblo, y sus amigos descubren una serie de misterios sobrenaturales.', 'S', 4, '2016-07-15', 8.7, '00:50:00', 'https://example.com/strangerthings.jpg', 'https://example.com/strangerthings.mp4'),
('Breaking Bad', 'Un profesor de química con cáncer se convierte en fabricante de metanfetamina.', 'S', 5, '2008-01-20', 9.5, '00:47:00', 'https://example.com/breakingbad.jpg', 'https://example.com/breakingbad.mp4'),
('The Crown', 'Drama biográfico sobre el reinado de la Reina Isabel II del Reino Unido.', 'S', 6, '2016-11-04', 8.6, '00:58:00', 'https://example.com/thecrown.jpg', 'https://example.com/thecrown.mp4'),
('The Office', 'Una comedia que sigue la vida diaria de empleados en una oficina de ventas de papel.', 'S', 4, '2005-03-24', 8.9, '00:22:00', 'https://example.com/theoffice.jpg', 'https://example.com/theoffice.mp4'),
('Game of Thrones', 'Nobles luchan por el control de los Siete Reinos mientras una amenaza antigua resurge.', 'S', 5, '2011-04-17', 9.3, '00:57:00', 'https://example.com/got.jpg', 'https://example.com/got.mp4'),
('Black Mirror', 'Serie antológica que explora una sociedad distópica impulsada por la tecnología.', 'S', 6, '2011-12-04', 8.8, '01:00:00', 'https://example.com/blackmirror.jpg', 'https://example.com/blackmirror.mp4');
