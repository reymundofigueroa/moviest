namespace Moviest_back.Models
{
  public class User
  {
    public int Id { get; set; }
    public string UserName { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string PasswordHash { get; set; } = null!;
    public DateTime BirthDate { get; set; }
    public DateTime RegistrationDate { get; set; }
  }
}
