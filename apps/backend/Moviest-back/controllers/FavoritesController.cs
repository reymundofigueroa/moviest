// Controlador para manejar las peticiones de favoritos
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moviest_back.Data;
using Moviest_back.Models;
using Moviest_back.Models.Dtos;

namespace Moviest_back.Controllers
{
    // Indicamos que es un controlador de API y definimos la ruta base: api/favorites
    [ApiController]
    [Route("api/[controller]")]
    public class FavoritesController : ControllerBase
    {
        private readonly MoviestDbContext _context;

        // Constructor que recibe el contexto de la base de datos
        public FavoritesController(MoviestDbContext context)
        {
            _context = context;
        }

        // POST: api/favorites
        // Agrega un contenido a los favoritos del usuario
        [HttpPost]
        public async Task<IActionResult> AddFavorite(AddFavoriteDto dto)
        {
            // Verifica que el contenido (película o serie) exista en la base de datos
            var contentExists = await _context.Contents.AnyAsync(c => c.id == dto.ContentId);
            if (!contentExists)
            {
                return NotFound($"No content found with ID {dto.ContentId}");
            }

            // Verifica si ya existe ese contenido como favorito del usuario
            var exists = await _context.Favorites.AnyAsync(f => f.UserId == dto.UserId && f.ContentId == dto.ContentId);
            if (exists)
            {
                return Conflict("Favorite already exists.");
            }

            // Si no existe, se crea un nuevo registro de favorito
            var favorite = new Favorites
            {
                UserId = dto.UserId,
                ContentId = dto.ContentId
            };

            // Se guarda en la base de datos
            _context.Favorites.Add(favorite);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Favorite added successfully." });
        }

        // DELETE: api/favorites
        // Elimina un contenido de los favoritos del usuario
        [HttpDelete]
        public async Task<IActionResult> DeleteFavorite([FromBody] AddFavoriteDto dto)
        {
            // Busca si existe el favorito con ese userId y contentId
            var favorite = await _context.Favorites
                .FirstOrDefaultAsync(f => f.UserId == dto.UserId && f.ContentId == dto.ContentId);

            if (favorite == null)
                return NotFound(new { message = "No se encontró el favorito." });

            // Elimina el registro
            _context.Favorites.Remove(favorite);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Favorito eliminado correctamente." });
        }

        // GET: api/favorites/user/{userId}
        // Obtiene la lista completa de películas/series favoritas de un usuario
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetFavoritesByUser(int userId)
        {
            // Se consultan los favoritos del usuario, incluyendo la información de la película
            var favorites = await _context.Favorites
                .Where(f => f.UserId == userId)
                .Include(f => f.Movie) // Incluye la navegación al contenido (Movie)
                .Select(f => new MovieDto
                {
                    Id = $"{f.Movie.id}",
                    Title = f.Movie.Title,
                    Description = f.Movie.ContentDescription ?? "",
                    Genre = f.Movie.Category != null ? f.Movie.Category.CategoryName : "",
                    Year = f.Movie.ContentYear.HasValue ? f.Movie.ContentYear.Value.Year : 0,
                    Rating = (decimal)f.Movie.Rating!,
                    Duration = f.Movie.Duration.HasValue ? (int)f.Movie.Duration.Value.TotalMinutes : 0,
                    CoverImage = f.Movie.CoverImage ?? "",
                    VideoUrl = f.Movie.VideoUrl ?? ""
                })
                .ToListAsync();

            return Ok(new { movies = favorites });
        }

        // GET: api/favorites/ids/{userId}
        // Obtiene solo los IDs de los contenidos favoritos de un usuario
        [HttpGet("ids/{userId}")]
        public async Task<ActionResult<FavoritesIdsResponseDto>> GetFavoriteIds(int userId)
        {
            var ids = await _context.Favorites
                .Where(f => f.UserId == userId)
                .Select(f => f.ContentId)
                .ToListAsync();

            return Ok(new FavoritesIdsResponseDto { FavoriteIds = ids });
        }
    }
}
