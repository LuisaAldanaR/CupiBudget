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

        // Here you can calculate one NetworkReport
        // Return the list of NetworkReports
        [HttpPost]
        [Route("List")]
        public IActionResult Get([FromBody] DataModel request)
        {
            List<FullTimeInstructor> lista = new List<FullTimeInstructor>();

            try
            {
                lista = _proyectoFormativoContext.FullTimeInstructors.Include(c => c.oNetwork).ToList();
                InPerson inPerson = new InPerson(request.data1, lista);
                // Get the list from NetworkReport
                var networks = inPerson.GetNetworks();

                // Create a list to store the JSON results
                var results = new List<object>();

                // Iterate through each NetworkReport object and add it to the results list
                foreach (var network in networks)
                {
                    results.Add(network);
                }

                // Return the list of results in the JSON response
                return Ok(results);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status200OK, new { mensaje = e.Message, response = lista });
            }
        }
    }
}
