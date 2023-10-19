using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProyectoFormativo.Data;
using ProyectoFormativo.Modelos.BudgetM;
using ProyectoFormativo.Modelos.InstructorM;
using ProyectoFormativo.Modelos.PDFM;
using System.Text.Json;

namespace ProyectoFormativo.Controllers.PDF
{

    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class PDFGeneratorController : ControllerBase
    {
        private readonly IPDFGenerator _pdfGenerator;
        public readonly ProyectoPruebaContext _proyectoFormativoContext;

        public PDFGeneratorController(IPDFGenerator pdfGenerator, ProyectoPruebaContext proyectoPruebaContext)
        {
            _pdfGenerator = pdfGenerator;
            _proyectoFormativoContext = proyectoPruebaContext;
        }

        // Return a report in PDF
        [HttpPost]
        [Route("Generate"), Authorize(Roles = "Admin")]
        public IActionResult GenerarPDF([FromBody] DataModel request)
        {
            List<FullTimeInstructor> lista = new List<FullTimeInstructor>();

            // Create a list to store JSON results
            var results = new List<object>();
            List<NetworkReport> networks1;
            List<NetworkReport> networks2;

            try
            {
                lista = _proyectoFormativoContext.FullTimeInstructors.Include(c => c.oNetwork).ToList();

                // Get list of NetworkReport for data1
                InPerson inPerson1 = new InPerson(request.data1, lista);
                networks1 = inPerson1.GetNetworks();

                // Get list of NetworkReport for data2
                InPerson inPerson2 = new InPerson(request.data2, lista);
                networks2 = inPerson2.GetNetworks();

                // Iterate through each NetworkReport object and add it to the results list
                foreach (var network in networks1)
                {
                    results.Add(network);
                }
                foreach (var network in networks2)
                {
                    results.Add(network);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status200OK, new { mensaje = ex.Message, response = lista });
            }


            // Generate the PDF
            var data = _pdfGenerator.GeneratePDF(networks1, networks2);

            // Create a MemoryStream from PDF data
            var stream = new MemoryStream(data);

            int id = (int)DateTime.Now.Ticks;
            // Create an object that represents the database entry
            var pdfEntry = new ArchivoPDF
            {
                ID = id,
                NombreArchivo = "Reporte.pdf", // Name of pdf file
                PDFData = stream.ToArray() // Converts the MemoryStream to a byte array
            };

            // Add the object to the database
            _proyectoFormativoContext.ArchivosPDF.Add(pdfEntry);
            //_proyectoFormativoContext.SaveChanges();

            // Return some response if necessary

            return File(stream, "application/pdf", "Reporte.pdf");
        }
    }
}
