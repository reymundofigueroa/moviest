using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moviest_back.Data;
using Moviest_back.Models;
using System.Security.Cryptography;
using System.Text;

namespace Moviest_back.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class AuthController : ControllerBase
  {
    private readonly MoviestDbContext _context;

    public AuthController(MoviestDbContext context)
    {
      _context = context;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
      var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
      if (user == null)
      {
        return Unauthorized("Invalid credentials");
      }

      // Verificar la contraseña con BCrypt
      if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
      {
        return Unauthorized("Invalid credentials");
      }

      return Ok(new { message = "Login successful", userId = user.Id });
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
      // Verificar si el usuario ya existe por email
      var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
      if (existingUser != null)
      {
        return BadRequest("User already exists");
      }

      // Hashear la contraseña con BCrypt
      var hashedPassword = BCrypt.Net.BCrypt.HashPassword(request.Password);

      // Crear usuario nuevo
      var newUser = new User
      {
        Email = request.Email,
        PasswordHash = hashedPassword,
        UserName = request.Name,
        BirthDate = request.BirthDate,
        RegistrationDate = DateTime.UtcNow
      };

      // Guardar en la base de datos
      _context.Users.Add(newUser);
      await _context.SaveChangesAsync();

      return Ok(new { message = "User registered successfully" });
    }

  }


  public class LoginRequest
  {
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;
  }

  public class RegisterRequest
  {
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;
    public string Name { get; set; } = null!;
    public DateTime BirthDate { get; set; }
  }
}
