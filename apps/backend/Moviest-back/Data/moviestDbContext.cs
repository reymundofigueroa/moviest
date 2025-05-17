using Microsoft.EntityFrameworkCore;
using Moviest_back.Models;

namespace Moviest_back.Data
{
    public class MoviestDbContext : DbContext
    {
        public MoviestDbContext(DbContextOptions<MoviestDbContext> options) : base(options) { }

        public DbSet<User> Usuarios { get; set; }
        public DbSet<Movie> Contenidos { get; set; }
        // Aquí pondrás Series, Categories, etc.
    }
}
