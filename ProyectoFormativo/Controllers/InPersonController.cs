using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Any;
using NetworkSimulator1;
using ProyectoFormativo.Data;
using ProyectoFormativo.Modelos;
using System.Text.Json;

namespace ProyectoFormativo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InPersonController : ControllerBase
    {
        public readonly ProyectoPruebaContext _proyectoFormativoContext;

        public InPersonController(ProyectoPruebaContext dbcontext)
        {
            _proyectoFormativoContext = dbcontext;
        }

        [HttpPost]
        [Route("List")]
        public IActionResult Get([FromBody] JsonElement request)
        {
            List<FullTimeInstructor> lista = new List<FullTimeInstructor>();

            try
            {
                lista = _proyectoFormativoContext.FullTimeInstructors.ToList();
                InPerson inPerson = new InPerson(request, lista);
                // Obtener la lista de NetworkReport
                var networks = inPerson.GetNetworks();

                // Crear una lista para almacenar los resultados JSON
                var results = new List<object>();

                // Iterar a través de cada objeto NetworkReport y agregarlo a la lista de resultados
                foreach (var network in networks)
                {
                    results.Add(network);
                }

                // Devolver la lista de resultados en la respuesta JSON
                return Ok(results);
            }
            catch(Exception e)
            {
                return StatusCode(StatusCodes.Status200OK, new { mensaje = e.Message, response = lista });
            }
        }
    }
}
