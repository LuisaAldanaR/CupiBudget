namespace ProyectoFormativo.Modelos.SimulatorM
{
    public class Goal
{
        public string Modality { get; set; } // Modality
        public int Target { get; set; } // TARGET
        public int Passes2021To2022 { get; set; } // Pass 2021 A 2022
        public decimal Percentage { get; set; } // %

        public int FirstQuarterEnrollment { get; set; } // First quarter CUPOS
        public int FirstQuarterTotal { get; set; } // First quarter TOTAL
        public decimal FirstQuarterPercentage { get; set; } // First quarter %
        public decimal FirstQuarterGroups {  get; set; }

        public int SecondQuarterEnrollment { get; set; } // Second quarter CUPOS
        public int SecondQuarterTotal { get; set; } // Second quarter TOTAL
        public decimal SecondQuarterPercentage { get; set; } // Second quarter %
        public decimal SecondQuarterGroups { get; set; }

        public int ThirdQuarterEnrollment { get; set; } // Third quarter CUPOS
        public int ThirdQuarterTotal { get; set; } // Third quarter TOTAL
        public decimal ThirdQuarterPercentage { get; set; } // Third quarter %
        public decimal ThirdQuarterGroups { get; set; }

        public int FourthQuarterEnrollment { get; set; } // Fourth quarter CUPOS
        public int FourthQuarterTotal { get; set; } // Fourth quarter TOTAL
        public decimal FourthQuarterPercentage { get; set; } // Fourth quarter %
        public decimal FourthQuarterGroups { get; set; }

        public int Margin { get; set; } // Margin of error


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

            var numFichas = Modality == "Virtual" ? 50 : 30;
            FirstQuarterGroups = (decimal)FirstQuarterEnrollment / numFichas;
            SecondQuarterGroups = (decimal)SecondQuarterEnrollment / numFichas;
            ThirdQuarterGroups = (decimal)ThirdQuarterEnrollment / numFichas;
            FourthQuarterGroups = (decimal)FourthQuarterEnrollment / numFichas;
            Margin = FourthQuarterTotal - Target;
        }

        public Goal(GoalDTO dto, Goal goal1, Goal goal2)
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

            FirstQuarterGroups = goal1.FirstQuarterGroups + goal2.FirstQuarterGroups;
            SecondQuarterGroups = goal1.SecondQuarterGroups + goal2.SecondQuarterGroups;
            ThirdQuarterGroups = goal1.ThirdQuarterGroups + goal2.ThirdQuarterGroups;
            FourthQuarterGroups = goal1.FourthQuarterGroups + goal2.FourthQuarterGroups;
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
            Percentage =  Target == 0 ? Math.Round((decimal)Passes2021To2022 / 1) :  Math.Round((decimal)Passes2021To2022 / Target * 100, 1);
            FirstQuarterPercentage = Target == 0 ? Math.Round((decimal)Passes2021To2022 / 1) : Math.Round((decimal)FirstQuarterTotal / Target * 100, 1);
            SecondQuarterPercentage = Target == 0 ? Math.Round((decimal)Passes2021To2022 / 1) : Math.Round((decimal)SecondQuarterTotal / Target * 100, 1);
            ThirdQuarterPercentage = Target == 0 ? Math.Round((decimal)Passes2021To2022 / 1) : Math.Round((decimal)ThirdQuarterTotal / Target * 100, 1);
            FourthQuarterPercentage = Target == 0 ? Math.Round((decimal)Passes2021To2022 / 1) : Math.Round((decimal)FourthQuarterTotal / Target * 100, 1);
        }


    }
}
