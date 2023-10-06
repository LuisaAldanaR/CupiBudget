using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ProyectoFormativo.Modelos.InstructorM;

public partial class Network
{
    public int IdNetwork { get; set; }

    public string? NetworkName { get; set; }
    [JsonIgnore]
    public virtual ICollection<ContractInstructor> ContractInstructors { get; set; } = new List<ContractInstructor>();
    [JsonIgnore]
    public virtual ICollection<FullTimeInstructor> FullTimeInstructors { get; set; } = new List<FullTimeInstructor>();
}
