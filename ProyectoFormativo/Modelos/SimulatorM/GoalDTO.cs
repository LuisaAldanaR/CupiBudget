namespace ProyectoFormativo.Modelos.SimulatorM
{
    public class GoalDTO
    {
        public string Modality { get; set; } // Modalidad
        public int Target { get; set; } // META
        public int Passes2021To2022 { get; set; } // PASO 2021 A 2022
        public int FirstQuarterEnrollment { get; set; } // PRIMER TRIMESTRE CUPOS
        public int SecondQuarterEnrollment { get; set; } // PRIMER TRIMESTRE CUPOS
        public int ThirdQuarterEnrollment { get; set; } // PRIMER TRIMESTRE CUPOS
        public int FourthQuarterEnrollment { get; set; } // PRIMER TRIMESTRE CUPOS

        public GoalDTO(string modality, int target, int passes2021To2022, int firstQuarterEnrollment, int secondQuarterEnrollment, int thirdQuarterEnrollment, int fourthQuarterEnrollment)
        {
            Modality = modality;
            Target = target;
            Passes2021To2022 = passes2021To2022;
            FirstQuarterEnrollment = firstQuarterEnrollment;
            SecondQuarterEnrollment = secondQuarterEnrollment;
            ThirdQuarterEnrollment = thirdQuarterEnrollment;
            FourthQuarterEnrollment = fourthQuarterEnrollment;
        }
    }

    public class SimulatorDTO
    {
        public List<GoalDTO> goals1 { get; set; }
        public List<GoalDTO> goals2 { get; set; }
    }
}
