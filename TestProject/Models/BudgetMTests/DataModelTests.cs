using ProyectoFormativo.Modelos;
using ProyectoFormativo.Modelos.BudgetM;
using System;
using System.Collections.Generic;
using Xunit;

namespace TestProject.Models.BudgetMTests
{
    public class DataModelTests
    {
        [Fact]
        public void Data1GetSetOK()
        {
            // Arrange
            var dataModel = new DataModel();
            var expectedData1 = new List<NetworkData>
            {
                new NetworkData { totalGoal = 100, oldStudents = 50, idNetwork = 1 },
                new NetworkData { totalGoal = 200, oldStudents = 75, idNetwork = 2 }
            };

            // Act
            dataModel.data1 = expectedData1;
            var actualData1 = dataModel.data1;

            // Assert
            Assert.Equal(expectedData1, actualData1);
        }

        [Fact]
        public void Data2GetSetOk()
        {
            // Arrange
            var dataModel = new DataModel();
            var expectedData2 = new List<NetworkData>
            {
                new NetworkData { totalGoal = 300, oldStudents = 90, idNetwork = 3 },
                new NetworkData { totalGoal = 400, oldStudents = 120, idNetwork = 4 }
            };

            // Act
            dataModel.data2 = expectedData2;
            var actualData2 = dataModel.data2;

            // Assert
            Assert.Equal(expectedData2, actualData2);
        }
    }
}
