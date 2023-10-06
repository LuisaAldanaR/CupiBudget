namespace ProyectoFormativo.Modelos.SimulatorM
{
    public class Goal
    {
        public string Modality { get; set; } // Modalidad
        public int Target { get; set; } // META
        public int Passes2021To2022 { get; set; } // PASO 2021 A 2022
        public decimal Percentage { get; set; } // %

        public int FirstQuarterEnrollment { get; set; } // PRIMER TRIMESTRE CUPOS
        public int FirstQuarterTotal { get; set; } // PRIMER TRIMESTRE TOTAL
        public decimal FirstQuarterPercentage { get; set; } // PRIMER TRIMESTRE %

        public int SecondQuarterEnrollment { get; set; } // SEGUNDO TRIMESTRE CUPOS
        public int SecondQuarterTotal { get; set; } // SEGUNDO TRIMESTRE TOTAL
        public decimal SecondQuarterPercentage { get; set; } // SEGUNDO TRIMESTRE %

        public int ThirdQuarterEnrollment { get; set; } // TERCER TRIMESTRE CUPOS
        public int ThirdQuarterTotal { get; set; } // TERCER TRIMESTRE TOTAL
        public decimal ThirdQuarterPercentage { get; set; } // TERCER TRIMESTRE %

        public int FourthQuarterEnrollment { get; set; } // CUARTO TRIMESTRE CUPOS
        public int FourthQuarterTotal { get; set; } // CUARTO TRIMESTRE TOTAL
        public decimal FourthQuarterPercentage { get; set; } // CUARTO TRIMESTRE %

        public int Margin { get; set; } // Margen de error


        public Goal(GoalDTO dto)
        {
            Modality = dto.Modality;
            Target = dto.Target;
            Passes2021To2022 = dto.Passes2021To2022;
            FirstQuarterEnrollment = dto.FirstQuarterEnrollment;
            SecondQuarterEnrollment = dto.SecondQuarterEnrollment;
            ThirdQuarterEnrollment = dto.ThirdQuarterEnrollment;
            FourthQuarterEnrollment = dto.FourthQuarterEnrollment;

            CalculateTotal();
            CalculatePercentage();

            Margin = FourthQuarterTotal - Target;
        }

        private void CalculateTotal()
        {
            FirstQuarterTotal = Passes2021To2022 + FirstQuarterEnrollment;
            SecondQuarterTotal = FirstQuarterTotal + SecondQuarterEnrollment;
            ThirdQuarterTotal = SecondQuarterTotal + ThirdQuarterEnrollment;
            FourthQuarterTotal = ThirdQuarterTotal + FourthQuarterEnrollment;
        }

        private void CalculatePercentage()
        {
            Percentage = Math.Round((decimal)Passes2021To2022 / Target * 100, 1);
            FirstQuarterPercentage = Math.Round((decimal)FirstQuarterTotal / Target * 100, 1);
            SecondQuarterPercentage = Math.Round((decimal)SecondQuarterTotal / Target * 100, 1);
            ThirdQuarterPercentage = Math.Round((decimal)ThirdQuarterTotal / Target * 100, 1);
            FourthQuarterPercentage = Math.Round((decimal)FourthQuarterTotal / Target * 100, 1);
        }


    }
}
