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

            var hashedPassword = ComputeSha256Hash(request.Password);
            if (user.PasswordHash != hashedPassword)
            {
                return Unauthorized("Invalid credentials");
            }

            // Aquí puedes devolver un token JWT en producción
            return Ok(new { message = "Login successful", userId = user.Id });
        }

        private string ComputeSha256Hash(string rawData)
        {
            using (SHA256 sha256Hash = SHA256.Create())
            {
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(rawData));
                StringBuilder builder = new StringBuilder();
                foreach (var b in bytes)
                {
                    builder.Append(b.ToString("x2"));
                }
                return builder.ToString();
            }
        }
    }

    public class LoginRequest
    {
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;
    }
}
