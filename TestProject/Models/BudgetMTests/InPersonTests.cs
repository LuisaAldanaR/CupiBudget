using ProyectoFormativo.Modelos.BudgetM;
using ProyectoFormativo.Modelos.InstructorM;
using Xunit;

namespace TestProject.Models.BudgetMTests
{
    public class InPersonTests
    {
        [Fact]
        public void GetNetworks_Should_Return_ListOfNetworkReports()
        {
            // Arrange
            var networkData = new List<NetworkData>
            {
                new NetworkData { totalGoal = 100, oldStudents = 50, idNetwork = 1 },
                new NetworkData { totalGoal = 200, oldStudents = 100, idNetwork = 2 }

            };

            var instructors = new List<FullTimeInstructor>
            {
                new FullTimeInstructor { IdInstructor = 1, Name = "Instructor 1" },
                new FullTimeInstructor { IdInstructor = 2, Name = "Instructor 2" }

            };

            var inPerson = new InPerson(networkData, instructors);

            // Act
            var result = inPerson.GetNetworks();

            // Assert
            // Verifica que result sea una lista de NetworkReport
            Assert.IsType<List<NetworkReport>>(result);

            // Verifica que la lista resultante tenga la misma cantidad de elementos que networkData
            Assert.Equal(networkData.Count, result.Count);
        }
    }
}


