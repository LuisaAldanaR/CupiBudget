using ProyectoFormativo.Modelos;
using ProyectoFormativo.Modelos.InstructorM;
using System;
using Xunit;

namespace TestProject.Models.InstructorMTests
{
    public class FullTimeInstructorTests
    {
        [Fact]
        public void FullTimeInstructorOK()
        {
            // Arrange
            int idInstructor = 1;
            int? networkId = 10;
            string name = "Carlos Perez";
            string position = "Instructor";
            DateTime? endDateCourse = DateTime.Now.AddMonths(3);
            Network network = new Network(); // Creamos una instancia de Network

            // Act
            var fullTimeInstructor = new FullTimeInstructor
            {
                IdInstructor = idInstructor,
                NetworkId = networkId,
                Name = name,
                Position = position,
                EndDateCourse = endDateCourse,
                oNetwork = network // Asignamos la instancia de Network a oNetwork
            };

            // Assert
            Assert.Equal(idInstructor, fullTimeInstructor.IdInstructor);
            Assert.Equal(networkId, fullTimeInstructor.NetworkId);
            Assert.Equal(name, fullTimeInstructor.Name);
            Assert.Equal(position, fullTimeInstructor.Position);
            Assert.Equal(endDateCourse, fullTimeInstructor.EndDateCourse);

            // Verificamos que oNetwork no sea nulo
            Assert.NotNull(fullTimeInstructor.oNetwork);
        }

        [Fact]
        public void FullTimeInstructorFail()
        {
            // Arrange
            int idInstructor = 1;
            int? networkId = 100;//No hay una Red con un ID numerico de 100 
            string name = "Alejo Perez";
            string position = "Coordinador";
            DateTime? endDateCourse = DateTime.Now.AddMonths(-3);
            Network network = new Network(); // Creamos una instancia de Network

            // Act
            var fullTimeInstructor = new FullTimeInstructor
            {
                IdInstructor = idInstructor,
                NetworkId = networkId,
                Name = name,
                Position = position,
                EndDateCourse = endDateCourse,
                oNetwork = network // Asignamos la instancia de Network a oNetwork
            };

            // Assert
            Assert.Equal(idInstructor, fullTimeInstructor.IdInstructor);
            Assert.Equal(networkId, fullTimeInstructor.NetworkId);
            Assert.Equal(name, fullTimeInstructor.Name);
            Assert.Equal(position, fullTimeInstructor.Position);
            Assert.Equal(endDateCourse, fullTimeInstructor.EndDateCourse);

            // Verificamos que oNetwork no sea nulo
            Assert.NotNull(fullTimeInstructor.oNetwork);
        }

        [Fact]
        public void FullTimeInstructorNull()
        {
            // Arrange
            int idInstructor = 2;
            int? networkId = null;
            string name = null;
            string position = null;
            DateTime? endDateCourse = null; // endDateCourse está configurado como nulo
            Network network = null; // oNetwork está configurado como nulo

            // Act
            var fullTimeInstructor = new FullTimeInstructor
            {
                IdInstructor = idInstructor,
                NetworkId = networkId,
                Name = name,
                Position = position,
                EndDateCourse = endDateCourse,
                oNetwork = network
            };

            // Assert
            Assert.Equal(idInstructor, fullTimeInstructor.IdInstructor);

            // Verificamos que estas propiedades deben ser nulas
            Assert.Null(fullTimeInstructor.NetworkId);
            Assert.Null(fullTimeInstructor.Name);
            Assert.Null(fullTimeInstructor.Position);
            Assert.Null(fullTimeInstructor.EndDateCourse);
            Assert.Null(fullTimeInstructor.oNetwork);
        }
    }
}

