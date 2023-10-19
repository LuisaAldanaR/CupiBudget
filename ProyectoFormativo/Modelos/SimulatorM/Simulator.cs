namespace ProyectoFormativo.Modelos.SimulatorM
{
    public class Simulator
    {
        public List<Goal> goals1 { get; set; } = new List<Goal>();
        public List<Goal> goals2 { get; set; } = new List<Goal>();
        public List<Goal> goal3 { get; set; } = new List<Goal>();
        public List<Goal> goal4 { get; set; } = new List<Goal>();

        public Simulator(List<Goal> goals1, List<Goal> goals2, List<Goal> goal3, List<Goal> goal4)
        {
            this.goals1 = goals1;
            this.goals2 = goals2;
            this.goal3 = goal3;
            this.goal4 = goal4;
        }
    }
}
