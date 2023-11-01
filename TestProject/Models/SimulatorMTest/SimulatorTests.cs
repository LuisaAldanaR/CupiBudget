using System.Collections.Generic;
using Xunit;
using ProyectoFormativo.Modelos.SimulatorM;

namespace TestProject.Models.SimulatorMTests
{
    public class SimulatorTests
    {
        [Fact]
        public void Constructor_Sets_Properties_Correctly()
        {
            // Arrange
            var goals1 = new List<Goal>
        {
            new Goal(new GoalDTO("Modality 1", 100, 80, 30, 20, 25, 25)),
            new Goal(new GoalDTO("Modality 2", 150, 120, 40, 30, 35, 45))
        };
            var goals2 = new List<Goal>
        {
            new Goal(new GoalDTO("Modality 3", 200, 160, 60, 40, 50, 50)),
            new Goal(new GoalDTO("Modality 4", 250, 200, 80, 60, 70, 75))
        };
            var goal3 = new List<Goal>
        {
            new Goal(new GoalDTO("Modality 5", 300, 240, 90, 60, 75, 75)),
            new Goal(new GoalDTO("Modality 6", 350, 280, 100, 70, 80, 85))
        };
            var goal4 = new List<Goal>
        {
            new Goal(new GoalDTO("Modality 7", 400, 320, 120, 80, 90, 95)),
            new Goal(new GoalDTO("Modality 8", 450, 360, 140, 100, 100, 105))
        };

            // Act
            var simulator = new Simulator(goals1, goals2, goal3, goal4);

            // Assert
            Assert.Equal(goals1, simulator.goals1);
            Assert.Equal(goals2, simulator.goals2);
            Assert.Equal(goal3, simulator.goal3);
            Assert.Equal(goal4, simulator.goal4);
        }
    }
}