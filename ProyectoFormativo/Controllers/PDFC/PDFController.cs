using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProyectoFormativo.Data;
using System.Security.Cryptography;
using System;
using System.Text;

namespace ProyectoFormativo.Controllers.PDF
{
    [Route("api/[controller]")]
    [ApiController]
    public class PDFController : ControllerBase
    {
        private readonly ProyectoPruebaContext _context;

        public PDFController(ProyectoPruebaContext context)
        {
            _context = context;
        }

        // Return a PDF by ID
        [HttpGet]
        public IActionResult DownloadPdf(int id)
        {
            try
            {
                var archivoPDF = _context.ArchivosPDF.Find(id);

                if (archivoPDF == null)
                {
                    return NotFound(); // Return a 404 error if the pdf doesn't exist
                }

                // Create a MemoryStream from the PDF binary data
                var pdfStream = new MemoryStream(archivoPDF.PDFData);

                // Return de pdf file as a response
                return File(pdfStream, "application/pdf", archivoPDF.NombreArchivo);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
