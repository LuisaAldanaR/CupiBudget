namespace ProyectoFormativo.Modelos.SimulatorM
{
    public class Simulator
    {
        public List<Goal> goals1 { get; set; } = new List<Goal>();
        public Goal goal2 { get; set; }
        public List<Goal> goals3 { get; set; }
        public Goal goal4 { get; set; }

        public Simulator(List<Goal> goals1, Goal goal2, List<Goal> goals3, Goal goal4)
        {
            this.goals1 = goals1;
            this.goal2 = goal2;
            this.goals3 = goals3;
            this.goal4 = goal4;
        }
    }
}
