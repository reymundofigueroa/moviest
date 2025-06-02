namespace Moviest_back.Models
{
  public class Favorites
  {
    public int UserId { get; set; }
    public int ContentId { get; set; }

    public User User { get; set; } = null!;
    public Movie Movie { get; set; } = null!;
  }
}
