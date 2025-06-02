using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moviest_back.Data;
using Moviest_back.Models.Dtos;

namespace Moviest_back.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class SearchController : ControllerBase
    {
        private readonly MoviestDbContext _context;

        public SearchController(MoviestDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> SearchContent([FromQuery] string query)
        {
            if (string.IsNullOrWhiteSpace(query))
            {
                return BadRequest(new { message = "Query is required." });
            }

            var results = await _context.Contents
                .Include(m => m.Category)
                .Where(m => (m.Title != null && m.Title.Contains(query)) || (m.ContentDescription != null && m.ContentDescription.Contains(query)))
            .Select(m => new MovieDto
            {
                Id = $"m{m.id}",
                Title = m.Title,
                Description = m.ContentDescription ?? "",
                Genre = m.Category != null ? m.Category.CategoryName : "",
                Year = m.ContentYear.HasValue ? m.ContentYear.Value.Year : 0,
                Rating = (decimal)m.Rating!,
                Duration = m.Duration.HasValue ? (int)m.Duration.Value.TotalMinutes : 0,
                CoverImage = m.CoverImage ?? "",
                VideoUrl = m.VideoUrl ?? ""
            })
            .ToListAsync();

            return Ok(new { movies = results });
        }
    }
}
