using Xunit;
using ProyectoFormativo.Modelos;
using System.Collections.Generic;
using ProyectoFormativo.Modelos.InstructorM;

namespace TestProject.Models.InstructorMTests
{
    public class NetworkTests
    {
        [Fact]
        public void NetworkPropertiesShouldWork()
        {
            // Arrange
            var network = new Network();

            // Act
            network.IdNetwork = 1;
            network.NetworkName = "Test Network";

            // Assert
            Assert.Equal(1, network.IdNetwork);
            Assert.Equal("Test Network", network.NetworkName);
        }

        [Fact]
        public void ContractInstructorsShouldBeInitialized()
        {
            // Arrange
            var network = new Network();

            // Act
            var contractInstructors = network.ContractInstructors;

            // Assert
            Assert.NotNull(contractInstructors);
            Assert.IsType<List<ContractInstructor>>(contractInstructors);
        }

        [Fact]
        public void FullTimeInstructorsShouldBeInitialized()
        {
            // Arrange
            var network = new Network();

            // Act
            var fullTimeInstructors = network.FullTimeInstructors;

            // Assert
            Assert.NotNull(fullTimeInstructors);
            Assert.IsType<List<FullTimeInstructor>>(fullTimeInstructors);
        }
    }
}
