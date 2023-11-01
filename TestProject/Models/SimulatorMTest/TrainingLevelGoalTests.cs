using System.Collections.Generic;
using Xunit;
using ProyectoFormativo.Modelos.SimulatorM;

namespace TestProject.Models.SimulatorMTests
{
    public class TrainingLevelGoalTests
    {
        [Fact]
        public void Constructor_Sets_Properties_Correctly()
        {
            // Arrange
            var goalsDTO = new List<GoalDTO>
        {
            new GoalDTO("Modality 1", 100, 80, 30, 20, 25, 25),
            new GoalDTO("Modality 2", 150, 120, 40, 30, 35, 45)
        };

            // Act
            var trainingLevelGoal = new TrainingLevelGoal(goalsDTO);

            // Assert
            Assert.Equal(goalsDTO, trainingLevelGoal.goalsDTO);

        }

        [Fact]
        public void CalculateGoals_Populates_Goals_Correctly()
        {
            // Arrange
            var goalsDTO = new List<GoalDTO>
        {
            new GoalDTO("Modality 1", 100, 80, 30, 20, 25, 25),
            new GoalDTO("Modality 2", 150, 120, 40, 30, 35, 45)
        };
            var trainingLevelGoal = new TrainingLevelGoal(goalsDTO);

            //// Act
            //trainingLevelGoal.CalculateGoals();

            // Assert
            Assert.Equal(goalsDTO.Count, trainingLevelGoal.goals.Count);

        }

        [Fact]
        public void CalculateAttributes_Calculates_Attributes_Correctly()
        {
            // Arrange
            var goalsDTO = new List<GoalDTO>
        {
            new GoalDTO("Modality 1", 100, 80, 30, 20, 25, 25),
            new GoalDTO("Modality 2", 150, 120, 40, 30, 35, 45)
        };
            var trainingLevelGoal = new TrainingLevelGoal(goalsDTO);

            //// Act
            //trainingLevelGoal.CalculateGoals();
            //trainingLevelGoal.CalculateAttributes();

            // Assert
            Assert.Equal(250, trainingLevelGoal.totalTarget);
            Assert.Equal(200, trainingLevelGoal.Passes2021To2022);
            Assert.Equal(70, trainingLevelGoal.FirstQuarterEnrollment);
            Assert.Equal(50, trainingLevelGoal.SecondQuarterEnrollment);
            Assert.Equal(60, trainingLevelGoal.ThirdQuarterEnrollment);
            Assert.Equal(70, trainingLevelGoal.FourthQuarterEnrollment);

        }

    }
}