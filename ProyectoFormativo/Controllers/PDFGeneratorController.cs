using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NetworkSimulator1;
using ProyectoFormativo.Data;
using ProyectoFormativo.Modelos;
using System.Text.Json;

namespace ProyectoFormativo.Controllers
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

        [HttpPost]
        [Route("Generate"), Authorize(Roles = "Admin") ]
        public IActionResult GenerarPDF([FromBody] DataModel request)
        {
            List<FullTimeInstructor> lista = new List<FullTimeInstructor>();

            // Crear una lista para almacenar los resultados JSON
            var results = new List<object>();

            try
            {
                lista = _proyectoFormativoContext.FullTimeInstructors.Include(c => c.oNetwork).ToList();

                // Obtener la lista de NetworkReport para data1
                InPerson inPerson1 = new InPerson(request.data1, lista);
                var networks1 = inPerson1.GetNetworks();

                // Obtener la lista de NetworkReport para data2
                InPerson inPerson2 = new InPerson(request.data2, lista);
                var networks2 = inPerson2.GetNetworks();

                // Iterar a través de cada objeto NetworkReport y agregarlo a la lista de resultados
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


            var data = _pdfGenerator.GeneratePDF();
            var stream = new MemoryStream(data);

            return File(stream, "application/pdf", "Reporte.pdf");
        }
    }
}
