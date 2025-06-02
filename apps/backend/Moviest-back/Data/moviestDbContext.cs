using Microsoft.EntityFrameworkCore;
using Moviest_back.Models;

namespace Moviest_back.Data
{
  public class MoviestDbContext : DbContext
  {
    public MoviestDbContext(DbContextOptions<MoviestDbContext> options) : base(options) { }
    public DbSet<User> Users { get; set; }
    public DbSet<Movie> Contents { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Favorites> Favorites { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.Entity<Favorites>()
          .HasKey(f => new { f.UserId, f.ContentId });

      modelBuilder.Entity<Favorites>()
          .HasOne(f => f.Movie)
          .WithMany()
          .HasForeignKey(f => f.ContentId);

      base.OnModelCreating(modelBuilder);
    }
  }
}
