using System.Collections.Generic;
using Xunit;
using ProyectoFormativo.Modelos.SimulatorM;

namespace TestProject.Models.SimulatorMTests
{
    public class GoalDTOTests
    {
        [Fact]
        public void Constructor_Sets_Properties_Correctly()
        {
            // Arrange
            string modality = "Virtual";
            int target = 100;
            int passes2021To2022 = 80;
            int firstQuarterEnrollment = 30;
            int secondQuarterEnrollment = 20;
            int thirdQuarterEnrollment = 25;
            int fourthQuarterEnrollment = 25;

            // Act
            var goalDTO = new GoalDTO(modality, target, passes2021To2022, firstQuarterEnrollment, secondQuarterEnrollment, thirdQuarterEnrollment, fourthQuarterEnrollment);

            // Assert
            Assert.Equal(modality, goalDTO.Modality);
            Assert.Equal(target, goalDTO.Target);
            Assert.Equal(passes2021To2022, goalDTO.Passes2021To2022);
            // Add more assertions for other properties
        }
    }

    public class SimulatorDTOTests
    {
        [Fact]
        public void Constructor_Sets_Properties_Correctly()
        {
            // Arrange
            var goals1 = new List<GoalDTO>
        {
            new GoalDTO("Modality 1", 100, 80, 30, 20, 25, 25),
            new GoalDTO("Modality 2", 150, 120, 40, 30, 35, 45)
        };
            var goals2 = new List<GoalDTO>
        {
            new GoalDTO("Modality 3", 200, 160, 60, 40, 50, 50),
            new GoalDTO("Modality 4", 250, 200, 80, 60, 70, 75)
        };

            // Act
            var simulatorDTO = new SimulatorDTO
            {
                goals1 = goals1,
                goals2 = goals2
            };

            // Assert
            Assert.Equal(goals1, simulatorDTO.goals1);
            Assert.Equal(goals2, simulatorDTO.goals2);
        }
    }
}