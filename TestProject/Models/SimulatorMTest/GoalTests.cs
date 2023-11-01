using System;
using Xunit;
using ProyectoFormativo.Modelos.SimulatorM;

namespace TestProject.Models.SimulatorMTests
{
    public class GoalTests
    {
        [Fact]
        public void Constructor_With_DTO_Sets_Properties_Correctly()
        {
            // Arrange
            var dto = new GoalDTO("Modality 1", 100, 80, 30, 20, 25, 25);

            // Act
            var goal = new Goal(dto);

            // Assert
            Assert.Equal("Modality 1", goal.Modality);
            Assert.Equal(100, goal.Target);
            Assert.Equal(80, goal.Passes2021To2022);

        }

        [Fact]
        public void Constructor_With_DTO_And_Two_Goals_Sets_Properties_Correctly()
        {
            // Arrange
            var dto = new GoalDTO("Modality 1", 100, 80, 30, 20, 25, 25);
            var goal1 = new Goal(dto);
            var goal2 = new Goal(dto);

            // Act
            var goal = new Goal(dto, goal1, goal2);

            // Assert
            Assert.Equal("Modality 1", goal.Modality);
            Assert.Equal(100, goal.Target);
            Assert.Equal(80, goal.Passes2021To2022);

        }

        [Fact]
        public void CalculateTotal_Calculates_Total_Correctly()
        {
            // Arrange
            var dto = new GoalDTO("Modality 1", 100, 80, 30, 20, 25, 25);
            var goal = new Goal(dto);

            // Act

            // Assert
            Assert.Equal(110, goal.FirstQuarterTotal);
            Assert.Equal(130, goal.SecondQuarterPercentage);
            Assert.Equal(155, goal.ThirdQuarterPercentage);
            Assert.Equal(180, goal.FourthQuarterPercentage);
        }

        [Fact]
        public void CalculatePercentage_Calculates_Percentage_Correctly()
        {
            // Arrange
            var dto = new GoalDTO("Modality 1", 100, 80, 30, 20, 25, 25);
            var goal = new Goal(dto);

            // Act

            // Assert
            Assert.Equal(80, goal.Percentage);
            Assert.Equal(110, goal.FirstQuarterPercentage);
            Assert.Equal(130, goal.SecondQuarterPercentage);
            Assert.Equal(155, goal.ThirdQuarterPercentage);
            Assert.Equal(180, goal.FourthQuarterPercentage);
        }
    }
}