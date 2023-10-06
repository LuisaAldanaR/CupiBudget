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

        [HttpGet]
        public IActionResult DownloadPdf(int id)
        {
            try
            {
                var archivoPDF = _context.ArchivosPDF.Find(id);

                if (archivoPDF == null)
                {
                    return NotFound(); // Devolver un error 404 si no se encuentra el archivo
                }

                // Crear un MemoryStream a partir de los datos binarios del PDF
                var pdfStream = new MemoryStream(archivoPDF.PDFData);

                // Devolver el archivo PDF como una respuesta
                return File(pdfStream, "application/pdf", archivoPDF.NombreArchivo);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
