using Xunit;

namespace TestProject.Models.AuthtnticationMTests
{
    public class UserTests
    {
        [Fact]
        public void UserPropertiesOk()
        {
            // Arrange
            var user = new ProyectoFormativo.Modelos.AuthenticationM.User();
            string username = "Fernanda Perez";
            byte[] passwordHash = new byte[] { 1, 2, 3 };
            byte[] passwordSalt = new byte[] { 4, 5, 6 };
            string mail = "ejemploprueba@example.com";
            string role = "regular";

            // Act
            user.Username = username;
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            user.Mail = mail;
            user.Role = role;

            // Assert
            Assert.Equal(username, user.Username);
            Assert.Equal(passwordHash, user.PasswordHash);
            Assert.Equal(passwordSalt, user.PasswordSalt);
            Assert.Equal(mail, user.Mail);
            Assert.Equal(role, user.Role);
        }

        [Fact]
        public void UserPropertiesNull()
        {
            // Arrange
            var user = new ProyectoFormativo.Modelos.AuthenticationM.User();
            string username = null;
            byte[] passwordHash = new byte[] { 9, 8, 7 };
            byte[] passwordSalt = new byte[] { 4, 5, 6 };
            string mail = null;
            string role = null;

            // Act
            user.Username = username;
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            user.Mail = mail;
            user.Role = role;

            // Assert
            Assert.Null(user.Username);
            Assert.Equal(passwordHash, user.PasswordHash);
            Assert.Equal(passwordSalt, user.PasswordSalt);
            Assert.Null(user.Mail);
            Assert.Null(user.Role);
        }


        [Fact]
        public void UserPropertiesFail()
        {
            // Arrange
            var user = new ProyectoFormativo.Modelos.AuthenticationM.User();
            string username = null;
            byte[] passwordHash = new byte[] { };
            byte[] passwordSalt = new byte[] { };
            string mail = "Carlos Perez";
            string role = "SuperAdmin";

            // Act
            user.Username = username;
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            user.Mail = mail;
            user.Role = role;

            // Assert
            Assert.Equal(username, user.Username);
            Assert.Equal(passwordHash, user.PasswordHash);
            Assert.Equal(passwordSalt, user.PasswordSalt);
            Assert.Equal(mail, user.Mail);
            Assert.Equal(role, user.Role);
        }
    }
}

