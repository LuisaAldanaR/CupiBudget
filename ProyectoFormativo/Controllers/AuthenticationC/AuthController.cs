using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.IdentityModel.Tokens;
using ProyectoFormativo.Data;
using ProyectoFormativo.Modelos;
using ProyectoFormativo.Modelos.AuthenticationM;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;

namespace ProyectoFormativo.Controllers.Authentication
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

        // EndPoint to validate the login 
        // We need a userDTO 
        // Return a Json Web Token
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

        // EndPoint to register a new user
        // We need a userDTO
        // Return a statusCode with the message if it was successed. Otherwise it will return the exception 
        [HttpPost("Register")]
        public async Task<ActionResult<User>> Register(UserDto request)
        {
            var auth = new Auth(_context, _configuration);
            auth.CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);

            user.Username = request.Username;
            user.PasswordSalt = passwordSalt;
            user.PasswordHash = passwordHash;

            try
            {
                _context.Users.Add(user);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status200OK, new { mensaje = "User registered successed" });
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status200OK, new { mensaje = e.Message });
            }
        }
    }
}
