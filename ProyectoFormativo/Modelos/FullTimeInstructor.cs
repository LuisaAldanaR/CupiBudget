using System;
using System.Collections.Generic;

namespace ProyectoFormativo.Modelos;

public partial class FullTimeInstructor
{
    public int IdInstructor { get; set; }

    public int? NetworkId { get; set; }

    public string? Name { get; set; }

    public string? Position { get; set; }

    public DateTime? EndDateCourse { get; set; }

    public virtual Network? oNetwork { get; set; }
}
