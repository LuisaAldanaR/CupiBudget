namespace ProyectoFormativo.Modelos
{
    public class TrainingProgram
    {
        public int Id { get; set; }
        public string Level { get; set; }
        public string? Mode { get; set; }
        public string? Name { get; set; }
        public string? ValidUntil{ get; set; }
        public int? SniesCode { get; set; }
        public int? ResolutionNumber { get; set; }
        public DateTime? ResolutionDate { get; set; }

    }
}
