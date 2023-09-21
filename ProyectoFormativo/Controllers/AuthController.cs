using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.IdentityModel.Tokens;
using ProyectoFormativo.Data;
using ProyectoFormativo.Modelos;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;

namespace ParkingMentoring.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        public static User user = new User();

        public readonly IConfiguration _configuration;
        private readonly ProyectoPruebaContext _context;

        public AuthController(IConfiguration configuration, ProyectoPruebaContext context) 
        {   
            _configuration = configuration;
            _context = context;
        }


        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(UserDto request)
        {
            var auth = new Auth(_context, _configuration);
            var user = _context.Users.FirstOrDefault(u => u.Username == request.Username);

            if (user == null)
            {
                return BadRequest("User not found");
            }

            if (!auth.VerifyPasswordHash(request.Password, user.PasswordHash, user.PasswordSalt))
            {
                return BadRequest("Wrong password");
            }
            string token = auth.CreateToken(user);
            return Ok(token);
        }
    }
}
