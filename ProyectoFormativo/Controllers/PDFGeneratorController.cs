using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProyectoFormativo.Modelos;

namespace ProyectoFormativo.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class PDFGeneratorController : ControllerBase
    {
        private readonly IPDFGenerator _pdfGenerator;

        public PDFGeneratorController(IPDFGenerator pdfGenerator)
        {
            _pdfGenerator = pdfGenerator;
        }

        [HttpGet]
        [Route("Generate"), Authorize(Roles = "Admin")]
        public IActionResult GenerarPDF()
        {
            var data = _pdfGenerator.GeneratePDF();
            var stream = new MemoryStream(data);

            return File(stream, "application/pdf", "Reporte.pdf");
        }
    }
}
