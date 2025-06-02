using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moviest_back.Data;
using Moviest_back.Models;
using Moviest_back.Models.Dtos;

namespace Moviest_back.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class MoviesController : ControllerBase
  {
    private readonly MoviestDbContext _context;

    public MoviesController(MoviestDbContext context)
    {
      _context = context;
    }

    // GET: api/movies
    [HttpGet]
    public async Task<IActionResult> GetMovies()
    {
      var movies = await _context.Contents
          .Include(c => c.Category)
          .ToListAsync();

      var movieDtos = movies
      .Where(m => m.ContentType == 'M')
      .Select(m => new MovieDto
      {
        Id = $"{m.id}",
        Title = m.Title,
        Description = m.ContentDescription!,
        Genre = m.Category.CategoryName,
        Year = m.ContentYear.HasValue ? m.ContentYear.Value.Year : 0,
        Rating = (decimal)m.Rating!,
        Duration = m.Duration.HasValue ? (int)m.Duration.Value.TotalMinutes : 0,
        CoverImage = m.CoverImage!,
        VideoUrl = m.VideoUrl!
      }).ToList();

      return Ok(new { movies = movieDtos });
    }

    [HttpGet("series")]
    public async Task<IActionResult> GetSeries()
    {
      var series = await _context.Contents
          .Include(c => c.Category)
          .ToListAsync();

      var movieDtos = series
      .Where(m => m.ContentType == 'S')
      .Select(m => new MovieDto
      {
        Id = $"{m.id}",
        Title = m.Title,
        Description = m.ContentDescription!,
        Genre = m.Category.CategoryName,
        Year = m.ContentYear.HasValue ? m.ContentYear.Value.Year : 0,
        Rating = (decimal)m.Rating!,
        Duration = m.Duration.HasValue ? (int)m.Duration.Value.TotalMinutes : 0,
        CoverImage = m.CoverImage!,
        VideoUrl = m.VideoUrl!
      }).ToList();

      return Ok(new { series = movieDtos });
    }

    [HttpGet("home")]
    public async Task<IActionResult> GetGroupedContent()
    {
      var contents = await _context.Contents
          .Include(m => m.Category)
          .ToListAsync();

      var movies = contents
          .Where(m => m.ContentType == 'M')
          .Select(m => new
          {
            id = $"{m.id}",
            title = m.Title,
            description = m.ContentDescription,
            genre = m.Category.CategoryName,
            year = m.ContentYear?.Year ?? 0,
            rating = m.Rating,
            Duration = m.Duration.HasValue ? (int)m.Duration.Value.TotalMinutes : 0,
            coverImage = m.CoverImage,
            videoUrl = m.VideoUrl
          })
          .ToList();

      var series = contents
          .Where(m => m.ContentType == 'S')
          .Select(m => new
          {
            id = $"{m.id}",
            title = m.Title,
            description = m.ContentDescription,
            genre = m.Category.CategoryName,
            year = m.ContentYear?.Year ?? 0,
            Rating = (decimal)m.Rating!,
            Duration = m.Duration.HasValue ? (int)m.Duration.Value.TotalMinutes : 0,
            coverImage = m.CoverImage,
            videoUrl = m.VideoUrl
          })
          .ToList();

      var response = new
      {
        movies,
        series
      };

      return Ok(response);
    }

    [HttpGet("categories")]
    public async Task<IActionResult> GetGroupedByCategory()
    {
      var contents = await _context.Contents
          .Include(m => m.Category)
          .ToListAsync();

      var grouped = contents
          .Where(m => m.Category != null)
          .GroupBy(m => m.Category!.CategoryName)
          .ToDictionary(
              g => g.Key,
              g => g.Select(m => new MovieDto
              {
                Id = $"{m.id}",
                Title = m.Title,
                Description = m.ContentDescription ?? "",
                Genre = g.Key,
                Year = m.ContentYear?.Year ?? 0,
                Rating = (m.Rating ?? 0),
                Duration = m.Duration.HasValue ? (int)m.Duration.Value.TotalMinutes : 0,
                CoverImage = m.CoverImage ?? "",
                VideoUrl = m.VideoUrl ?? ""
              }).ToList()
          );

      return Ok(grouped);
    }



    // GET: api/movies/details/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Movie>> GetMovie(int id)
    {
      var movie = await _context.Contents.FindAsync(id);

      if (movie == null)
      {
        return NotFound();
      }

      return movie;
    }

    // POST: api/movies
    [HttpPost]
    public async Task<IActionResult> Post([FromBody] CreateMovieDto dto)
    {
      var movie = new Movie
      {
        Title = dto.Title,
        ContentDescription = dto.ContentDescription,
        ContentType = dto.ContentType,
        CategoryId = dto.CategoryId,
        ContentYear = dto.ContentYear,
        Rating = dto.Rating,
        Duration = dto.Duration,
        CoverImage = dto.CoverImage,
        VideoUrl = dto.VideoUrl
      };

      _context.Contents.Add(movie);
      await _context.SaveChangesAsync();

      return CreatedAtAction(nameof(GetMovie), new { id = movie.id }, movie);
    }

    // PUT: api/movies/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutMovie(int id, Movie movie)
    {
      if (id != movie.id)
        return BadRequest();

      _context.Entry(movie).State = EntityState.Modified;

      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!_context.Contents.Any(m => m.id == id))
          return NotFound();
        else
          throw;
      }

      return NoContent();
    }

    // DELETE: api/movies/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteMovie(int id)
    {
      var movie = await _context.Contents.FindAsync(id);
      if (movie == null)
        return NotFound();

      _context.Contents.Remove(movie);
      await _context.SaveChangesAsync();

      return NoContent();
    }
  }
}
