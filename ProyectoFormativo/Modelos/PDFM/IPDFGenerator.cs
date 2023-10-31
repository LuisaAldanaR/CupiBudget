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
        byte[] GeneratePDF(List<NetworkReportInPerson> networks1, List<NetworkReportInPerson> networks2, List<NetworkReportVirtual> networks3, List<NetworkReportVirtual> networks4 );
    }
}
