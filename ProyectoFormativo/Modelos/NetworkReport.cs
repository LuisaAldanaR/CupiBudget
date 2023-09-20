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
        public int metaTotal { get; set; }
        public int estudiantesAntiguos { get; set; }
        public double presupuestoMensual { get; set; }
        public double presupuestoAnual { get; set; }
        public double presupuesto1T { get; set; }
        public double presupuesto2T { get; set; }
        public double presupuesto3T { get; set; }
        public double presupuesto4T { get; set; }
        public double idRed { get; set; }
        public int plantaTotal { get; set; }
        public int contratistaTotal { get; set; }

        public int[] contratistaT { get; set; } = new int[4];
        public int[] fichas { get; set; } = new int[4];
        public int[] planta { get; set; } = new int[4];

        public int fichasAntiguas { get; set; }
        public double fichasNuevas { get; set; }
        public int fichasTotal { get; set; }

        public NetworkReport(int metaTotal, int estudiantesAntiguos, List<FullTimeInstructor> instructores, int idRed)
        {
            this.metaTotal = metaTotal;
            this.estudiantesAntiguos = estudiantesAntiguos;
            this.fichas[0] = 0;
            this.fichas[1] = 0;
            this.fichas[2] = 0;
            this.fichas[3] = 0;

            this.idRed = idRed;
            this.fichasAntiguas = estudiantesAntiguos / 25;
            if (estudiantesAntiguos % 25 >= 15)
                fichasAntiguas++;

            this.fichasNuevas = (metaTotal - estudiantesAntiguos) / 30.0;
            if ((metaTotal - estudiantesAntiguos) % 30 > 18)
                fichasNuevas = Math.Ceiling(fichasNuevas);

            this.fichasTotal = fichasAntiguas + (int)fichasNuevas;
            this.plantaTotal = 0;

            meta70();
            meta80();
            meta90();
            meta100();
            calcularPresupuesto();
            calcularContratistas(instructores, idRed);
        }

        public void meta70()
        {
            fichas[0] = (int)(fichasNuevas * 0.7);
            if (fichasNuevas % 30 >= 21)
                fichas[0]++;
        }
        public void meta80()
        {
            double f = (fichasNuevas * 0.8);
            fichas[1] = (int)f - fichas[0];
            if (f * 30 % 30 >= 21)
                fichas[1]++;
        }
        public void meta90()
        {
            double f = (fichasNuevas * 0.9);
            fichas[2] = (int)f - fichas[0] - fichas[1];
            if (f * 30 % 30 >= 21)
                fichas[2]++;
        }
        public void meta100()
        {
            fichas[3] = (int)fichasNuevas - (fichas[0] + fichas[1] + fichas[2]);
        }

        public void calcularPresupuesto()
        {
            presupuestoMensual = 4_000_000;

            presupuesto1T = presupuestoMensual * fichas[0] * 10.5;
            presupuesto2T = presupuestoMensual * fichas[1] * 7.875;
            presupuesto3T = presupuestoMensual * fichas[2] * 5.25;
            presupuesto4T = presupuestoMensual * fichas[3] * 2.625;
            presupuestoAnual = presupuesto1T + presupuesto2T + presupuesto3T + presupuesto4T;
        }

        public void calcularContratistas(List<FullTimeInstructor> instructores, int idRed)
        {
            DateTime time = new DateTime(2022, 1, 1);

            for (int i = 0; i < 4; i++)
            {
                int temporalInstructorDisponible = 0;
                for (int j = 0; j < instructores.Count; j++)
                {
                    FullTimeInstructor aux = instructores[j];
                    if (aux.NetworkId == idRed && aux.EndDateCourse < time && temporalInstructorDisponible < fichas[i]) // Se valida que tenga la misma red y no tenga programa activo
                    {
                        temporalInstructorDisponible++;
                        aux.EndDateCourse = aux.EndDateCourse.Value.AddYears(1); // Asigna el nuevo valor con un año agregado
                    }
                }
                time.AddMonths(3);
                planta[i] = temporalInstructorDisponible;
                plantaTotal += planta[i];
                contratistaT[i] = fichas[i] - temporalInstructorDisponible;
                contratistaT[i] = (contratistaT[i] < 0) ? 0 : contratistaT[i];
                contratistaTotal += contratistaT[i];
            }
        }

        public override string ToString()
        {
            return $"Meta Total: {metaTotal}\n" +
                   $"Estudiantes Antiguos: {estudiantesAntiguos}\n" +
                   $"Presupuesto Mensual: {presupuestoMensual}\n" +
                   $"Presupuesto Anual: {presupuestoAnual}\n" +
                   $"Presupuesto 1T: {presupuesto1T}\n" +
                   $"Presupuesto 2T: {presupuesto2T}\n" +
                   $"Presupuesto 3T: {presupuesto3T}\n" +
                   $"Presupuesto 4T: {presupuesto4T}\n" +
                   $"Planta: {plantaTotal}\n" +
                   $"Contratista Total: {contratistaTotal}\n" +
                   $"Planta 1T: {planta[0]}\n" +
                   $"Planta 2T: {planta[1]}\n" +
                   $"Planta 3T: {planta[2]}\n" +
                   $"Planta 4T: {planta[3]}\n" +
                   $"Contratista 1T: {contratistaT[0]}\n" +
                   $"Contratista 2T: {contratistaT[1]}\n" +
                   $"Contratista 3T: {contratistaT[2]}\n" +
                   $"Contratista 4T: {contratistaT[3]}\n" +
                   $"Fichas 70: {fichas[0]}\n" +
                   $"Fichas 80: {fichas[1]}\n" +
                   $"Fichas 90: {fichas[2]}\n" +
                   $"Fichas 100: {fichas[3]}\n" +
                   $"Fichas Antiguas: {fichasAntiguas}\n" +
                   $"Fichas Nuevas: {fichasNuevas}\n" +
                   $"Fichas Total: {fichasTotal}\n" +
                   $"Id Red: {idRed}\n";

        }



    }
}
