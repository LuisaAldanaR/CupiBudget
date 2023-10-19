using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProyectoFormativo.Data;
using ProyectoFormativo.Modelos.InstructorM;

namespace ProyectoFormativo.Controllers.Instructor
{
    [EnableCors("ReglasCors")]
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class NetworkController : ControllerBase
    {
        public readonly ProyectoPruebaContext _dbcontext;

        public NetworkController(ProyectoPruebaContext dbcontext)
        {
            _dbcontext = dbcontext;
        }

        // Returns the list of networks from the database1
        [HttpGet]
        [Route("List"), Authorize(Roles = "Admin, Regular")]
        public IActionResult Get()
        {
            List<Network> lista = new List<Network>();

            try
            {
                lista = _dbcontext.Networks.ToList();
                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok", response = lista });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status200OK, new { mensaje = ex.Message, response = lista });
            }
        }

        // Returns a Networks by Id
        [HttpGet]
        [Route("GetId/{idNetwork:int}"), Authorize(Roles = "Admin")]
        public IActionResult Obtener(int idNetwork)
        {
            Network oNetwork = new Network();
            oNetwork = _dbcontext.Networks.Find(idNetwork);

            if (oNetwork == null)
            {
                return BadRequest("Network not found");
            }

            try
            {
                oNetwork = _dbcontext.Networks.Where(p => p.IdNetwork == oNetwork.IdNetwork).FirstOrDefault();
                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok", response = oNetwork });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status200OK, new { mensaje = ex.Message, response = idNetwork });
            }
        }

        // Register a network in our database
        // Return a statusCode 200 if it was successed, otherwise return the exception
        [HttpPost]
        [Route("Save"), Authorize(Roles = "Admin")]
        public IActionResult Guardar([FromBody] Network oNetwork)
        {
            try
            {
                _dbcontext.Networks.Add(oNetwork);
                _dbcontext.SaveChanges();
                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok" });
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status200OK, new { mensaje = e.Message });
            }
        }

        // Delete a network in our database 
        // Return a statusCode 200 if it was successed, otherwise return the exception
        [HttpDelete]
        [Route("Delete/{idNetwork:int}"), Authorize(Roles = "Admin")]
        public IActionResult Eliminar(int idNetwork)
        {

            Network oNetwork = new Network();
            oNetwork = _dbcontext.Networks.Find(idNetwork);

            if (oNetwork == null)
            {
                return BadRequest("Network not found");
            }

            try
            {
                _dbcontext.Networks.Remove(oNetwork);
                _dbcontext.SaveChanges();
                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok" });
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status200OK, new { mensaje = e.Message });
            }
        }
    }
}
