using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProyectoFormativo.Data;
using ProyectoFormativo.Modelos.TrainingProgramM;

namespace ProyectoFormativo.Controllers.TrainingProgramC
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TrainingProgramController : ControllerBase
    {
        public readonly ProyectoPruebaContext _dbcontext;

        public TrainingProgramController(ProyectoPruebaContext dbcontext)
        {
            _dbcontext = dbcontext;
        }

        [HttpGet]
        [Route("List"), Authorize(Roles = "Admin, Regular")]
        public IActionResult Get()
        {
            try
            {
                var list = _dbcontext.Programs.ToList();

                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok", response = list });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("ListTechnologistInPerson"), Authorize(Roles = "Admin, Regular")]
        public IActionResult GetTechnologistInPerson()
        {
            try
            {
                var list = _dbcontext.Programs.Where(p => p.Level == "TECNOLOGO" && p.Mode == "PRESENCIAL");

                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok", response = list });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("ListTechnicalInPerson"), Authorize(Roles = "Admin, Regular")]
        public IActionResult GetTechnicalInPerson()
        {
            try
            {
                var list = _dbcontext.Programs.Where(p => p.Level == "TECNICO" && p.Mode == "PRESENCIAL");

                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok", response = list });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("ListTechnicalVirtual"), Authorize(Roles = "Admin, Regular")]
        public IActionResult GetTechnicalVirtual()
        {
            try
            {
                var list = _dbcontext.Programs.Where(p => p.Level == "TECNICO" && p.Mode == "VIRTUAL");

                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok", response = list });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("ListTechnologistInVirtual"), Authorize(Roles = "Admin, Regular")]
        public IActionResult GetTechnologistVirtual()
        {
            try
            {
                var list = _dbcontext.Programs.Where(p => p.Level == "TECNOLOGO" && p.Mode == "VIRTUAL");

                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok", response = list });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost]
        [Route("Save"), Authorize(Roles = "Admin")]
        public IActionResult Guardar([FromBody] TrainingProgram oProgram)
        {
            try
            {
                _dbcontext.Programs.Add(oProgram);
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
