// Esta clase representa el contexto de base de datos principal
using Microsoft.EntityFrameworkCore;
using Moviest_back.Models;

namespace Moviest_back.Data
{
  public class MoviestDbContext : DbContext
  {
    // Constructor que recibe las opciones del contexto y las pasa a la clase base
    public MoviestDbContext(DbContextOptions<MoviestDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }         // Tabla de usuarios
    public DbSet<Movie> Contents { get; set; }     // Tabla de películas o series (Contents)
    public DbSet<Category> Categories { get; set; } // Tabla de categorías
    public DbSet<Favorites> Favorites { get; set; } // Tabla de favoritos (relación usuario-contenido)

    // Configuraciones personalizadas del modelo que se aplican al crear la base de datos
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      // Configura la clave compuesta de la tabla Favorites: UserId + ContentId
      modelBuilder.Entity<Favorites>()
          .HasKey(f => new { f.UserId, f.ContentId });

      // Configura la relación entre Favorites y Movie (Contenido)
      // Un favorito está relacionado con un contenido, y un contenido puede tener muchos favoritos
      modelBuilder.Entity<Favorites>()
          .HasOne(f => f.Movie)
          .WithMany()
          .HasForeignKey(f => f.ContentId);

      // Llama a la configuración base
      base.OnModelCreating(modelBuilder);
    }
  }
}
