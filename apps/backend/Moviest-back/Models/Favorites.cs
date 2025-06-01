namespace Moviest_back.Models
{
  public class Favorites
  {
    public int UserId { get; set; }
    public int ContentId { get; set; }

    public Movie Movie { get; set; } = null!;
  }
}
