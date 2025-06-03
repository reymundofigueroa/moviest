// Controlador de autenticación para registrar usuarios y hacer login

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
  // Ruta base del controlador: api/auth
  [Route("api/[controller]")]
  [ApiController]
  public class AuthController : ControllerBase
  {
    private readonly MoviestDbContext _context; // Inyección del contexto de base de datos

    // Constructor que recibe el contexto a través de inyección de dependencias
    public AuthController(MoviestDbContext context)
    {
      _context = context;
    }

    // POST: api/auth/login
    // Endpoint para iniciar sesión de un usuario
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
      // Buscar al usuario en la base de datos por su email
      var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
      if (user == null)
      {
        // Si no se encuentra el usuario, se devuelve Unauthorized (401)
        return Unauthorized("Invalid credentials");
      }

      // Verificar si la contraseña proporcionada coincide con el hash almacenado
      if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
      {
        return Unauthorized("Invalid credentials");
      }

      // Obtener la clave secreta del token desde variables de entorno
      var secretKey = Environment.GetEnvironmentVariable("JWT_SECRET_KEY");
      if (string.IsNullOrEmpty(secretKey))
      {
        // Si la clave no está definida, se devuelve error del servidor
        return StatusCode(500, "JWT_SECRET_KEY no está definido.");
      }

      // Generar la clave y las credenciales para firmar el token
      var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
      var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

      // Crear los "claims" del token con información del usuario
      var claims = new[]
      {
        new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
        new Claim(JwtRegisteredClaimNames.Email, user.Email),
        new Claim("name", user.UserName)
      };

      // Generar el token JWT con los claims y duración de 2 horas
      var token = new JwtSecurityToken(
          claims: claims,
          expires: DateTime.UtcNow.AddHours(2),
          signingCredentials: credentials
      );

      // Convertir el token a string
      var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

      // Devolver el token y el ID del usuario como respuesta
      return Ok(new
      {
        message = "Login successful",
        userId = user.Id,
        token = tokenString
      });
    }

    // POST: api/auth/register
    // Endpoint para registrar un nuevo usuario
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
      // Verificar si ya existe un usuario con ese email
      var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
      if (existingUser != null)
      {
        // Si ya existe, devolver error 400
        return BadRequest("User already exists");
      }

      // Hashear la contraseña usando BCrypt
      var hashedPassword = BCrypt.Net.BCrypt.HashPassword(request.Password);

      // Crear un nuevo objeto de usuario
      var newUser = new User
      {
        Email = request.Email,
        PasswordHash = hashedPassword,
        UserName = request.Name,
        BirthDate = request.BirthDate,
        RegistrationDate = DateTime.UtcNow
      };

      // Guardar el nuevo usuario en la base de datos
      _context.Users.Add(newUser);
      await _context.SaveChangesAsync();

      return Ok(new { message = "User registered successfully" });
    }
  }

  // Clase auxiliar para el login
  public class LoginRequest
  {
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;
  }

  // Clase auxiliar para el registro
  public class RegisterRequest
  {
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;
    public string Name { get; set; } = null!;
    public DateTime BirthDate { get; set; }
  }
}
