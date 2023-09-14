using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Microsoft.EntityFrameworkCore;


using Microsoft.AspNetCore.Cors;
using ProyectoFormativo.Modelos;

namespace APIPlanta.Controllers
{

    [EnableCors("ReglasCors")]
    [Route("api/[controller]")]
    [ApiController]
    public class FullTimeInstructorController : ControllerBase
    {
        public readonly ProyectoPruebaContext _proyectoFormativoContext;

        public FullTimeInstructorController(ProyectoPruebaContext _context)
        {
            _proyectoFormativoContext = _context;
        }

        [HttpGet]
        [Route("List")]

        public IActionResult List()
        {
            List<FullTimeInstructor> lista = new List<FullTimeInstructor>();

            try
            {
                lista = _proyectoFormativoContext.FullTimeInstructors.Include(c => c.oNetwork).ToList();

                return StatusCode(StatusCodes.Status200OK, new { mensaje = "Ok", response = lista });
            }

            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status200OK, new { mensaje = ex.Message, response = lista });

            }
        }

        [HttpGet]
        [Route("GetId/{idInstructor:int}")]

        public IActionResult Get(int idInstructor)
        {
            FullTimeInstructor oInstructor = _proyectoFormativoContext.FullTimeInstructors.Find(idInstructor);

            if(oInstructor == null)
            {
                return BadRequest("Instructor no encontrado");
            }

            try
            {

                oInstructor = _proyectoFormativoContext.FullTimeInstructors.Include(c => c.oNetwork).Where(p => p.IdInstructor == idInstructor).FirstOrDefault();

                return StatusCode(StatusCodes.Status200OK, new { mensaje = "Ok", response = oInstructor });
            }

            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status200OK, new { mensaje = ex.Message, response = oInstructor });

            }
        }

        [HttpPost]
        [Route("Save")]

        public IActionResult Save([FromBody] FullTimeInstructor Instructor)
        {

            try
            {
                _proyectoFormativoContext.FullTimeInstructors.Add(Instructor);
                _proyectoFormativoContext.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok" });
            }

            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status200OK, new { mensaje = ex.Message });

            }
        }

        [HttpPut]
        [Route("Edit")]

        public IActionResult Edit([FromBody] FullTimeInstructor Instructor)
        {
            FullTimeInstructor oInstructor = _proyectoFormativoContext.FullTimeInstructors.Find(Instructor.IdInstructor);

            if (oInstructor == null)
            {
                return BadRequest("Instructor no encontrado");
            }

            try
            {
                oInstructor.NetworkId = Instructor.NetworkId is null ? oInstructor.NetworkId : Instructor.NetworkId;
                oInstructor.Name = Instructor.Name is null ? oInstructor.Name : Instructor.Name;
                oInstructor.Position = Instructor.Position is null ? oInstructor.Position : Instructor.Position;
                oInstructor.EndDateCourse = Instructor.EndDateCourse is null ? oInstructor.EndDateCourse : Instructor.EndDateCourse;

                _proyectoFormativoContext.FullTimeInstructors.Update(oInstructor);
                _proyectoFormativoContext.SaveChanges();


                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok" });
            }

            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status200OK, new { mensaje = ex.Message });

            }
        }

        [HttpDelete]
        [Route("Delete/{idInstructor:int}")]

        public IActionResult Delete(int idInstructor)
        {
            FullTimeInstructor oInstructor = _proyectoFormativoContext.FullTimeInstructors.Find(idInstructor);

            if (oInstructor == null)
            {
                return BadRequest("Instructor no encontrado");
            }

            try
            {
                _proyectoFormativoContext.FullTimeInstructors.Remove(oInstructor);
                _proyectoFormativoContext.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok" });
            }

            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status200OK, new { mensaje = ex.Message });

            }
        }
    }
}
