using System.ComponentModel.DataAnnotations.Schema;

namespace Moviest_back.Models
{
  public class Movie
  {
    public int id { get; set; }

    public string Title { get; set; } = null!;

    public string? ContentDescription { get; set; }

    public int Genre { get; set; }

    public DateTime? ContentYear { get; set; }

    [Column(TypeName = "decimal(2,1)")]
    public decimal? Rating { get; set; }

    public TimeSpan? Duration { get; set; } // Alternativa a TimeOnly

    public string? CoverImage { get; set; }

    public string? VideoUrl { get; set; }
  }
}
