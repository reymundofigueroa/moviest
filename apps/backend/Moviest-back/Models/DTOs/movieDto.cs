// DTO Para enviar el JSON de películas
namespace Moviest_back.Models.Dtos
{
  public class MovieDto
  {
    public string Id { get; set; } = null!;
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string Genre { get; set; } = null!;
    public int Year { get; set; }
    public decimal Rating { get; set; }
    public int Duration { get; set; } // En minutos
    public string CoverImage { get; set; } = null!;
    public string VideoUrl { get; set; } = null!;
  }
}
