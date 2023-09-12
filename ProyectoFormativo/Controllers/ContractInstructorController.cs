using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Microsoft.EntityFrameworkCore;
using ProyectoFormativo.Modelos;
using Microsoft.AspNetCore.Cors;

namespace ProyectoFormativo.Controllers
{
    [EnableCors("ReglasCors")]
    [Route("api/[controller]")]
    [ApiController]
    public class ContractInstructorController : ControllerBase
    {
        public readonly ProyectoPruebaContext _dbcontext;

        public ContractInstructorController(ProyectoPruebaContext dbcontext)
        {
            _dbcontext = dbcontext; 
        }

        [HttpGet]
        [Route("List")]
        public IActionResult Get()
        {
            List<ContractInstructor> lista = new List<ContractInstructor>();  

            try
            {
                lista = _dbcontext.ContractInstructors.Include(c => c.oNetwork).ToList();
                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok", response = lista });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status200OK, new { mensaje = ex.Message, response = lista });
            }
        }

        [HttpGet]
        [Route("GetId/{idInstructor:int}")]
        public IActionResult Obtener(int idInstructor)
        {
            ContractInstructor oInstructor = new ContractInstructor();
            oInstructor = _dbcontext.ContractInstructors.Find(idInstructor);

            if (oInstructor == null)
            {
                return BadRequest("Instructor not found");
            }

            try
            {
                oInstructor = _dbcontext.ContractInstructors.Include(c => c.oNetwork).Where(p => p.IdInstructor == idInstructor).FirstOrDefault();
                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok", response = oInstructor });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status200OK, new { mensaje = ex.Message, response = idInstructor });
            }
        }

        [HttpPost]
        [Route("Save")]
        public IActionResult Guardar([FromBody] ContractInstructor oInstructor)
        {
            try
            {
                _dbcontext.ContractInstructors.Add(oInstructor);
                _dbcontext.SaveChanges();
                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok" });

            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status200OK, new { mensaje = e.Message });
            }
        }

        
        [HttpPut]
        [Route("Edit")]
        public IActionResult Editar([FromBody] ContractInstructor objeto)
        {

            ContractInstructor oInstructor = _dbcontext.ContractInstructors.Find(objeto.IdInstructor);

            if (oInstructor == null)
            {
                return BadRequest("Instructor not found");
            }

            try
            {
                oInstructor.NetworkId = objeto.NetworkId is null ? oInstructor.NetworkId : objeto.NetworkId;
                oInstructor.Name = objeto.Name is null ? oInstructor.Name : objeto.Name;
                oInstructor.StartDate = objeto.StartDate is null ? oInstructor.StartDate : objeto.StartDate;
                oInstructor.EndDate = objeto.EndDate is null ? oInstructor.EndDate : objeto.EndDate;

                _dbcontext.ContractInstructors.Update(oInstructor);
                _dbcontext.SaveChanges();
                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok" });
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status200OK, new { mensaje = e.Message });
            }
        }

        [HttpDelete]
        [Route("Delete/{idInstructor:int}")]
        public IActionResult Eliminar(int idInstructor)
        {
            
            ContractInstructor oInstructor = _dbcontext.ContractInstructors.Find(idInstructor);

            if (oInstructor == null)
            {
                return BadRequest("Instructor not found");
            }

            try
            {
                _dbcontext.ContractInstructors.Remove(oInstructor);
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
