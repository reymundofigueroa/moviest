using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moviest_back.Data;
using Moviest_back.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
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

    if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
    {
        return Unauthorized("Invalid credentials");
    }

    // Aquí empieza la generación del token
    var secretKey = Environment.GetEnvironmentVariable("JWT_SECRET_KEY");
    if (string.IsNullOrEmpty(secretKey))
    {
        return StatusCode(500, "JWT_SECRET_KEY no está definido.");
    }

    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
    var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

    var claims = new[]
    {
        new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
        new Claim(JwtRegisteredClaimNames.Email, user.Email),
        new Claim("name", user.UserName)
    };

    var token = new JwtSecurityToken(
        claims: claims,
        expires: DateTime.UtcNow.AddHours(2),
        signingCredentials: credentials
    );

    var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

    return Ok(new
    {
        message = "Login successful",
        token = tokenString
    });
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
