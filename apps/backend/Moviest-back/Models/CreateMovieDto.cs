public class CreateMovieDto
{
  public string Title { get; set; } = null!;
    public string ContentDescription { get; set; } = null!;
    public char ContentType { get; set; }
    public int CategoryId { get; set; }
    public DateTime? ContentYear { get; set; }
    public decimal Rating { get; set; }
    public TimeSpan? Duration { get; set; }
    public string CoverImage { get; set; } = null!;
    public string VideoUrl { get; set; } = null!;
}
