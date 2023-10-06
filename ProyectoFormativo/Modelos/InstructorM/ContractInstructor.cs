using System;
using System.Collections.Generic;

namespace ProyectoFormativo.Modelos.InstructorM;

public partial class ContractInstructor
{
    public int IdInstructor { get; set; }

    public int? NetworkId { get; set; }

    public string? Name { get; set; }

    public DateTime? StartDate { get; set; }

    public DateTime? EndDate { get; set; }

    public DateTime? EndDateCourse { get; set; }

    public virtual Network? oNetwork { get; set; }
}
