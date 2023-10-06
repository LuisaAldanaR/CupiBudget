using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Any;
using ProyectoFormativo.Data;
using ProyectoFormativo.Modelos.BudgetM;
using ProyectoFormativo.Modelos.InstructorM;
using System.Text.Json;

namespace ProyectoFormativo.Controllers.Budget
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
        public IActionResult Get([FromBody] DataModel request)
        {
            List<FullTimeInstructor> lista = new List<FullTimeInstructor>();

            try
            {
                lista = _proyectoFormativoContext.FullTimeInstructors.Include(c => c.oNetwork).ToList();
                InPerson inPerson = new InPerson(request.data1, lista);
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
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status200OK, new { mensaje = e.Message, response = lista });
            }
        }
    }
}
