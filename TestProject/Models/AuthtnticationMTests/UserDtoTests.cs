using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ProyectoFormativo.Modelos;
using System.Threading.Tasks;
using Xunit;
using ProyectoFormativo.Modelos.AuthenticationM;

namespace TestProject.Models.AuthtnticationMTests
{
    public class UserDtoTests
    {
        [Fact]
        public void UserDtoTestOk()
        {
            // Arrange
            string name = "Felipe Perez";
            string password = "password";
            string mail = "FelipePerez@gmail.com";

            // Act
            var userDto = new UserDto
            {
                Username = name,
                Password = password,
                Mail = mail
            };

            // Assert
            Assert.Equal(name, userDto.Username);
            Assert.Equal(password, userDto.Password);
            Assert.Equal(mail, userDto.Mail);

        }

        [Fact]
        public void UserDtoPasswordFailed()
        {
            // Arrange
            var userDto = new UserDto();
            string expectedPassword = "securePassword";

            // Act
            userDto.Password = "anotherPassword";
            string actualPassword = userDto.Password;

            // Assert
            Assert.NotEqual(expectedPassword, actualPassword);
        }

    }
}
