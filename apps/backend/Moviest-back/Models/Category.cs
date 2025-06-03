// Modelo de la tabla Categories
namespace Moviest_back.Models
{
  public class Category
  {
    public int Id { get; set; }
    public string CategoryName { get; set; } = null!;

    // Relación inversa: una categoría tiene muchos contenidos
    public ICollection<Movie> Movies { get; set; } = null!;
  }
}
