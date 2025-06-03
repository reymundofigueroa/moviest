using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moviest_back.Data;
using Moviest_back.Models.Dtos;

namespace Moviest_back.Controllers
{
  // Indica que este es un controlador de API.
  [ApiController]
  // Define la ruta base del controlador como "search", gracias a [controller].
  [Route("[controller]")]
  public class SearchController : ControllerBase
  {
    // Inyección de dependencias: contexto de base de datos.
    private readonly MoviestDbContext _context;

    // Constructor para inicializar el controlador con el DbContext.
    public SearchController(MoviestDbContext context)
    {
      _context = context;
    }

    // Endpoint GET que responde a peticiones tipo: /search?query=algo
    [HttpGet]
    public async Task<IActionResult> SearchContent([FromQuery] string query)
    {
      // Verifica si el parámetro "query" es nulo, vacío o solo espacios.
      if (string.IsNullOrWhiteSpace(query))
      {
        // Devuelve un error 400 Bad Request si la búsqueda está vacía.
        return BadRequest(new { message = "Query is required." });
      }

      // Realiza la consulta a la base de datos incluyendo la categoría.
      // Filtra contenidos cuyo título o descripción contenga el texto de búsqueda.
      var results = await _context.Contents
          .Include(m => m.Category) // Incluye los datos de la categoría relacionados.
          .Where(m =>
              (m.Title != null && m.Title.Contains(query)) ||
              (m.ContentDescription != null && m.ContentDescription.Contains(query)))
          .Select(m => new MovieDto // Convierte cada resultado en un DTO.
          {
            Id = $"{m.id}", // Se convierte a string para mantener el formato del frontend.
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

      // Devuelve los resultados como una respuesta HTTP 200 con formato JSON.
      return Ok(new { movies = results });
    }
  }
}
