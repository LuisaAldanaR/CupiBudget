using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ProyectoFormativo.Data;
using ProyectoFormativo.Modelos;
using ProyectoFormativo.Modelos.AuthenticationM;
using System;
using System.Security.Claims;
using Xunit;


namespace TestProject.Models.AuthtnticationMTests
{
    public class AuthTests
    {
        private readonly IConfiguration _configuration;
        private readonly ProyectoPruebaContext _context;

        public AuthTests()
        {
            // Configurar IConfiguration y ProyectoPruebaContext
            _configuration = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .Build();

            var serviceProvider = new ServiceCollection()
                .AddDbContext<ProyectoPruebaContext>()
                .BuildServiceProvider();

            _context = serviceProvider.GetService<ProyectoPruebaContext>();
        }

        [Fact]
        public void CreateTokenAdminOk()
        {
            // Arrange
            var auth = new Auth(_context, _configuration);
            var user = new User
            {
                Username = "David Perez",
                Role = "Admin"
            };

            // Act
            var token = auth.CreateToken(user);

            // Assert
            Assert.NotNull(token);
            Assert.NotEmpty(token);
        }

        [Fact]
        public void CreateTokenRegularOk()
        {
            // Arrange
            var auth = new Auth(_context, _configuration);
            var user = new User
            {
                Username = "Luisa Perez",
                Role = "Regular"
            };

            // Act
            var token = auth.CreateToken(user);

            // Assert
            Assert.NotNull(token);
            Assert.NotEmpty(token);
        }

        [Fact]
        public void CreateTokenAdminFail()
        {
            // Arrange
            var auth = new Auth(_context, _configuration);
            var user = new User
            {
                Username = "Carlos Perez",
                Role = "SuperAdmin"
            };

            // Act
            var token = auth.CreateToken(user);

            // Assert
            Assert.NotNull(token);
            Assert.NotEmpty(token);
        }

        [Fact]
        public void CreatePasswordHashAndVerify()
        {
            // Arrange
            var auth = new Auth(_context, _configuration);
            string password = "testpassword";
            byte[] passwordHash;
            byte[] passwordSalt;

            // Act
            auth.CreatePasswordHash(password, out passwordHash, out passwordSalt);

            // Assert
            Assert.NotNull(passwordHash);
            Assert.NotNull(passwordSalt);

            // Verifica que VerifyPasswordHash devuelva true con la misma contraseña
            bool passwordMatch = auth.VerifyPasswordHash(password, passwordHash, passwordSalt);
            Assert.True(passwordMatch);
        }

        [Fact]
        public void CreatePasswordHashAndVerifyIncorrect()
        {
            // Arrange
            var auth = new Auth(_context, _configuration);
            string correctPassword = "testpassword";
            string incorrectPassword = "incorrectpassword"; // Contraseña incorrecta
            byte[] passwordHash;
            byte[] passwordSalt;

            // Act
            auth.CreatePasswordHash(correctPassword, out passwordHash, out passwordSalt);

            // Assert
            Assert.NotNull(passwordHash);
            Assert.NotNull(passwordSalt);

            // Verifica que VerifyPasswordHash devuelva true con la contraseña correcta
            bool correctPasswordMatch = auth.VerifyPasswordHash(correctPassword, passwordHash, passwordSalt);
            Assert.True(correctPasswordMatch);

            // Verifica que VerifyPasswordHash devuelva false con la contraseña incorrecta
            bool incorrectPasswordMatch = auth.VerifyPasswordHash(incorrectPassword, passwordHash, passwordSalt);
            Assert.False(incorrectPasswordMatch);
        }
    }
}



