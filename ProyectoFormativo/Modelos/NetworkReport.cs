using ProyectoFormativo.Modelos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NetworkSimulator1
{
    public class NetworkReport
    {
        public int totalGoal { get; set; }
        public int oldStudents { get; set; }
        public double monthlyBudget { get; set; }
        public double annualBudget { get; set; }
        public double budget1T { get; set; }
        public double budget2T { get; set; }
        public double budget3T { get; set; }
        public double budget4T { get; set; }
        public double idNetwork { get; set; }
        public int fullTimeTotal { get; set; }
        public int contractTotal { get; set; }

        public int[] contractT { get; set; } = new int[4];
        public int[] courses { get; set; } = new int[4];
        public int[] fullTime { get; set; } = new int[4];

        public int oldCourses { get; set; }
        public double newCourses { get; set; }
        public int totalCourses { get; set; }

        public NetworkReport(int totalGoal, int oldStudents, List<FullTimeInstructor> instructors, int idNetwork)
        {
            this.totalGoal = totalGoal;
            this.oldStudents = oldStudents;
            this.courses[0] = 0;
            this.courses[1] = 0;
            this.courses[2] = 0;
            this.courses[3] = 0;

            this.idNetwork = idNetwork;
            this.oldCourses = oldStudents / 25;
            if (oldStudents % 25 >= 15)
                oldCourses++;

            this.newCourses = (totalGoal - oldStudents) / 30.0;
            if ((totalGoal - oldStudents) % 30 > 18)
                newCourses = Math.Ceiling(newCourses);

            this.totalCourses = oldCourses + (int)newCourses;
            this.fullTimeTotal = 0;

            goal70();
            goal80();
            goal90();
            goal100();
            calculateBudget();
            calculateInstructors(instructors, idNetwork);


            this.newCourses = (totalGoal - oldStudents) / 30.0;
            if ((totalGoal - oldStudents) % 30 > 18)
                newCourses = Math.Ceiling(newCourses);
            else
                newCourses = (int)newCourses;
        }

        public void goal70()
        {
            courses[0] = (int)(newCourses * 0.7);
            if (newCourses % 30 >= 21)
                courses[0]++;
        }
        public void goal80()
        {
            double f = (newCourses * 0.8);
            courses[1] = (int)f - courses[0];
            if (f * 30 % 30 >= 21)
                courses[1]++;
        }
        public void goal90()
        {
            double f = (newCourses * 0.9);
            courses[2] = (int)f - courses[0] - courses[1];
            if (f * 30 % 30 >= 21)
                courses[2]++;
        }
        public void goal100()
        {
            courses[3] = (int)newCourses - (courses[0] + courses[1] + courses[2]);
        }

        public void calculateBudget()
        {
            monthlyBudget = 4_000_000;

            budget1T = monthlyBudget * courses[0] * 10.5;
            budget2T = monthlyBudget * courses[1] * 7.875;
            budget3T = monthlyBudget * courses[2] * 5.25;
            budget4T = monthlyBudget * courses[3] * 2.625;
            annualBudget = budget1T + budget2T + budget3T + budget4T;
        }

        public void calculateInstructors(List<FullTimeInstructor> instructores, int idRed)
        {
            DateTime time = new DateTime(DateTime.Now.Year, 1, 1);

            for (int i = 0; i < 4; i++)
            {
                int temporalInstructorDisponible = 0;
                for (int j = 0; j < instructores.Count; j++)
                {
                    FullTimeInstructor aux = instructores[j];
                    if (aux.NetworkId == idRed && aux.EndDateCourse < time && temporalInstructorDisponible < courses[i]) // Se valida que tenga la misma red y no tenga programa activo
                    {
                        temporalInstructorDisponible++;
                        aux.EndDateCourse = aux.EndDateCourse.Value.AddYears(1); // Asigna el nuevo valor con un año agregado
                    }
                }
                time.AddMonths(3);
                fullTime[i] = temporalInstructorDisponible;
                fullTimeTotal += fullTime[i];
                contractT[i] = courses[i] - temporalInstructorDisponible;
                contractT[i] = (contractT[i] < 0) ? 0 : contractT[i];
                contractTotal += contractT[i];
            }
        }

        public override string ToString()
        {
            return $"Meta Total: {totalGoal}\n" +
                   $"Estudiantes Antiguos: {oldStudents}\n" +
                   $"Presupuesto Mensual: {monthlyBudget}\n" +
                   $"Presupuesto Anual: {annualBudget}\n" +
                   $"Presupuesto 1T: {budget1T}\n" +
                   $"Presupuesto 2T: {budget2T}\n" +
                   $"Presupuesto 3T: {budget3T}\n" +
                   $"Presupuesto 4T: {budget4T}\n" +
                   $"Planta: {fullTimeTotal}\n" +
                   $"Contratista Total: {contractTotal}\n" +
                   $"Planta 1T: {fullTime[0]}\n" +
                   $"Planta 2T: {fullTime[1]}\n" +
                   $"Planta 3T: {fullTime[2]}\n" +
                   $"Planta 4T: {fullTime[3]}\n" +
                   $"Contratista 1T: {contractT[0]}\n" +
                   $"Contratista 2T: {contractT[1]}\n" +
                   $"Contratista 3T: {contractT[2]}\n" +
                   $"Contratista 4T: {contractT[3]}\n" +
                   $"Fichas 70: {courses[0]}\n" +
                   $"Fichas 80: {courses[1]}\n" +
                   $"Fichas 90: {courses[2]}\n" +
                   $"Fichas 100: {courses[3]}\n" +
                   $"Fichas Antiguas: {oldCourses}\n" +
                   $"Fichas Nuevas: {newCourses}\n" +
                   $"Fichas Total: {totalCourses}\n" +
                   $"Id Red: {idNetwork}\n";

        }



    }
}
