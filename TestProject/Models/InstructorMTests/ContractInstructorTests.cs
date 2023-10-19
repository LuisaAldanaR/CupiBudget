using System;
using Xunit;
using ProyectoFormativo.Modelos;
using ProyectoFormativo.Modelos.InstructorM;

namespace TestProject.Models.InstructorMTests
{
    public class ContractInstructorTests
    {
        [Fact]
        public void ContractInstructorOK()
        {
            // Arrange
            int idInstructor = 1;
            int? networkId = 12;
            string name = "Messis Perez";
            DateTime? startDate = DateTime.Now;
            DateTime? endDate = DateTime.Now.AddDays(30);
            DateTime? endDateCourse = DateTime.Now.AddMonths(3);
            Network network = new Network(); // Creamos una instancia de Network

            // Act
            var contractInstructor = new ContractInstructor
            {
                IdInstructor = idInstructor,
                NetworkId = networkId,
                Name = name,
                StartDate = startDate,
                EndDate = endDate,
                EndDateCourse = endDateCourse,
                oNetwork = network // Asignamos la instancia de Network a oNetwork
            };

            // Assert
            Assert.Equal(idInstructor, contractInstructor.IdInstructor);
            Assert.Equal(networkId, contractInstructor.NetworkId);
            Assert.Equal(name, contractInstructor.Name);
            Assert.Equal(startDate, contractInstructor.StartDate);
            Assert.Equal(endDate, contractInstructor.EndDate);
            Assert.Equal(endDateCourse, contractInstructor.EndDateCourse);
            Assert.NotNull(contractInstructor.oNetwork);// Verificamos que oNetwork no sea nulo
        }

        [Fact]
        public void ContracInstructorFail()
        {
            // Arrange
            int idInstructor = 2;
            int? networkId = 15;//No hay una Red con un ID numerico de 15 
            string name = "Neymar Perez";
            DateTime? startDate = DateTime.Now;
            DateTime? endDate = DateTime.Now.AddDays(-30);//La Fecha de fin del contrato no puede ser menor a la del inicio del contrato
            DateTime? endDateCourse = DateTime.Now.AddMonths(3);
            Network network = null; // oNetwork está configurado como nulo

            // Act
            var contractInstructor = new ContractInstructor
            {
                IdInstructor = idInstructor,
                NetworkId = networkId,
                Name = name,
                StartDate = startDate,
                EndDate = endDate,
                EndDateCourse = endDateCourse,
                oNetwork = network
            };
            // Assert
            Assert.Equal(idInstructor, contractInstructor.IdInstructor);
            Assert.Equal(networkId, contractInstructor.NetworkId);
            Assert.Equal(name, contractInstructor.Name);
            Assert.Equal(startDate, contractInstructor.StartDate);
            Assert.Equal(endDate, contractInstructor.EndDate);
            Assert.Equal(endDateCourse, contractInstructor.EndDateCourse);
            Assert.Null(contractInstructor.oNetwork);
        }

        [Fact]
        public void ContractInstructorNull()
        {
            // Arrange
            int idInstructor = 1;
            int? networkId = null;
            string name = null;
            DateTime? startDate = DateTime.Now;
            DateTime? endDate = DateTime.Now.AddDays(30);
            DateTime? endDateCourse = null; // endDateCourse está configurado como nulo
            Network network = null; // oNetwork está configurado como nulo

            // Act
            var contractInstructor = new ContractInstructor
            {
                IdInstructor = idInstructor,
                NetworkId = networkId,
                Name = name,
                StartDate = startDate,
                EndDate = endDate,
                EndDateCourse = endDateCourse,
                oNetwork = network
            };

            // Assert
            Assert.Equal(idInstructor, contractInstructor.IdInstructor);

            // Verificamos que estas propiedades deben ser nulas
            Assert.Null(contractInstructor.NetworkId);
            Assert.Null(contractInstructor.Name);
            Assert.Null(contractInstructor.EndDateCourse);
            Assert.Null(contractInstructor.oNetwork);

            // Verificamos que estas propiedades no deben ser nulas
            Assert.NotNull(contractInstructor.StartDate);
            Assert.NotNull(contractInstructor.EndDate);
        }
    }
}

