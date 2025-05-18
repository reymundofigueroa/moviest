namespace Moviest_back.Models
{
  public class Movie
  {
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
    public DateTime ReleaseDate { get; set; }
    public DateTime CreatedAt { get; set; }
    public int CategoryId { get; set; }
  }
}
