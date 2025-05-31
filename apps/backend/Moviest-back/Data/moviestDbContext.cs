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
  }
}
