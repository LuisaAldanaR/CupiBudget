using ProyectoFormativo.Modelos.BudgetM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProyectoFormativo.Modelos.PDFM
{
    public interface IPDFGenerator
    {
        byte[] GeneratePDF(List<NetworkReport> networks1, List<NetworkReport> networks2);
    }
}
