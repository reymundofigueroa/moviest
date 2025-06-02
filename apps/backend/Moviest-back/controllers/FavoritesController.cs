using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moviest_back.Data;
using Moviest_back.Models;
using Moviest_back.Models.Dtos;

namespace Moviest_back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FavoritesController : ControllerBase
    {
        private readonly MoviestDbContext _context;

        public FavoritesController(MoviestDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> AddFavorite(AddFavoriteDto dto)
        {
            // Validar que el contenido existe
            var contentExists = await _context.Contents.AnyAsync(c => c.id == dto.ContentId);
            if (!contentExists)
            {
                return NotFound($"No content found with ID {dto.ContentId}");
            }

            // Verificar si ya existe
            var exists = await _context.Favorites.AnyAsync(f => f.UserId == dto.UserId && f.ContentId == dto.ContentId);
            if (exists)
            {
                return Conflict("Favorite already exists.");
            }

            var favorite = new Favorites
            {
                UserId = dto.UserId,
                ContentId = dto.ContentId
            };

            _context.Favorites.Add(favorite);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Favorite added successfully." });
        }


        [HttpDelete]
        public async Task<IActionResult> DeleteFavorite([FromBody] AddFavoriteDto dto)
        {
            var favorite = await _context.Favorites
                .FirstOrDefaultAsync(f => f.UserId == dto.UserId && f.ContentId == dto.ContentId);

            if (favorite == null)
                return NotFound(new { message = "No se encontró el favorito." });

            _context.Favorites.Remove(favorite);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Favorito eliminado correctamente." });
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetFavoritesByUser(int userId)
        {
            var favorites = await _context.Favorites
                .Where(f => f.UserId == userId)
                .Include(f => f.Movie) // Incluye la película asociada
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
