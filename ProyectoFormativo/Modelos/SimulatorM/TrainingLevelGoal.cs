namespace ProyectoFormativo.Modelos.SimulatorM
{
    public class TrainingLevelGoal
    {
        public List<GoalDTO> goalsDTO { get; set; }
        public List<Goal> goals { get; set; }
        public Goal totalGoal { get; set; }
        public int totalTarget { get; set; }
        public int Passes2021To2022 { get; set; } // PASO 2021 A 2022

        public int FirstQuarterEnrollment { get; set; } // First quarter CUPOS
        public int SecondQuarterEnrollment { get; set; } // Second quarter CUPOS
        public int ThirdQuarterEnrollment { get; set; } // Third quarter CUPOS
        public int FourthQuarterEnrollment { get; set; } // Fourth quarter CUPOS


        public TrainingLevelGoal(List<GoalDTO> goalsDTO)
        {
            this.goalsDTO = goalsDTO;
            goals = new List<Goal>();

            totalTarget = 0;
            Passes2021To2022 = 0;
            FirstQuarterEnrollment = 0;
            SecondQuarterEnrollment = 0;
            ThirdQuarterEnrollment = 0;
            FourthQuarterEnrollment = 0;

            CalculateGoals();
            CalculateAttributes();
        }

        public void CalculateGoals()
        {
            foreach (var item in goalsDTO)
            {
                Goal g = new Goal(item);
                goals.Add(g);
            }
        }

        public void CalculateAttributes()
        {
            foreach (var item in goals)
            {
                totalTarget += item.Target;
                Passes2021To2022 += item.Passes2021To2022;
                FirstQuarterEnrollment += item.FirstQuarterEnrollment;
                SecondQuarterEnrollment += item.SecondQuarterEnrollment;
                ThirdQuarterEnrollment += item.ThirdQuarterEnrollment;
                FourthQuarterEnrollment += item.FourthQuarterEnrollment;
            }

            var aux = new GoalDTO("", totalTarget, Passes2021To2022, FirstQuarterEnrollment, SecondQuarterEnrollment, ThirdQuarterEnrollment, FourthQuarterEnrollment);
            totalGoal = new Goal(aux);
        }

    }
}
