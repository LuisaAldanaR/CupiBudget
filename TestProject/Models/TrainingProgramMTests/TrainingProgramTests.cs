using System;
using Xunit;
using ProyectoFormativo.Modelos.TrainingProgramM;

public class TrainingProgramTests
{
    [Fact]
    public void ConstructorSetsPropertiesCorrectly()
    {
        // Arrange
        int id = 1;
        string level = "Bachelor's";
        string mode = "Online";
        string name = "Computer Science";
        string validUntil = "2025-12-31"; // Date string
        int sniesCode = 12345;
        int resolutionNumber = 6789;
        DateTime resolutionDate = DateTime.Now;

        // Act
        var trainingProgram = new TrainingProgram
        {
            Id = id,
            Level = level,
            Mode = mode,
            Name = name,
            ValidUntil = validUntil,
            SniesCode = sniesCode,
            ResolutionNumber = resolutionNumber,
            ResolutionDate = resolutionDate
        };

        // Assert
        Assert.Equal(id, trainingProgram.Id);
        Assert.Equal(level, trainingProgram.Level);
        Assert.Equal(mode, trainingProgram.Mode);
        Assert.Equal(name, trainingProgram.Name);
        Assert.Equal(validUntil, trainingProgram.ValidUntil);
        Assert.Equal(sniesCode, trainingProgram.SniesCode);
        Assert.Equal(resolutionNumber, trainingProgram.ResolutionNumber);
        Assert.Equal(resolutionDate, trainingProgram.ResolutionDate);
    }

    [Fact]
    public void PropertiesCanHoldNullValues()
    {
        // Arrange
        var trainingProgram = new TrainingProgram();

        // Act & Assert
        Assert.Null(trainingProgram.Level);
        Assert.Null(trainingProgram.Mode);
        Assert.Null(trainingProgram.Name);
        Assert.Null(trainingProgram.ValidUntil);
        Assert.Null(trainingProgram.SniesCode);
        Assert.Null(trainingProgram.ResolutionNumber);
        Assert.Null(trainingProgram.ResolutionDate);
    }
}
