using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Microsoft.EntityFrameworkCore;


using Microsoft.AspNetCore.Cors;
using ProyectoFormativo.Data;
using Microsoft.AspNetCore.Authorization;
using System;
using SkiaSharp;
using ProyectoFormativo.Modelos.InstructorM;

namespace ProyectoFormativo.Controllers.Instructor
{

    [EnableCors("ReglasCors")]
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class FullTimeInstructorController : ControllerBase
    {
        public readonly ProyectoPruebaContext _proyectoFormativoContext;

        public FullTimeInstructorController(ProyectoPruebaContext _context)
        {
            _proyectoFormativoContext = _context;
        }

        // Returns the list of fullTimeInstructors from the database
        [HttpGet]
        [Route("List"), Authorize(Roles = "Admin,Regular")]

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

        // Returns a fullTimeInstructor by Id
        [HttpGet]
        [Route("GetId/{idInstructor:int}"), Authorize(Roles = "Admin, Regular")]

        public IActionResult Get(int idInstructor)
        {
            FullTimeInstructor oInstructor = _proyectoFormativoContext.FullTimeInstructors.Find(idInstructor);

            if (oInstructor == null)
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

        // Register an instructor in our database
        // Return a statusCode 200 if it was successed, otherwise return the exception
        [HttpPost]
        [Route("Save"), Authorize(Roles = "Admin")]

        public IActionResult Save([FromBody] FullTimeInstructor Instructor)
        {
            var aInstructor = _proyectoFormativoContext.FullTimeInstructors.Where(c => c.Name == Instructor.Name).FirstOrDefault();

            if (aInstructor != null)
                return BadRequest("El instructor ya existe");

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

        // Edit an instructor in our database 
        // Return a statusCode 200 if it was successed, otherwise return the exception
        [HttpPut]
        [Route("Edit"), Authorize(Roles = "Admin")]

        public IActionResult Edit([FromBody] FullTimeInstructor Instructor)
        {
            FullTimeInstructor oInstructor = _proyectoFormativoContext.FullTimeInstructors.Find(Instructor.IdInstructor);

            if (oInstructor == null)
            {
                return BadRequest("Instructor no encontrado");
            }

            var aInstructor = _proyectoFormativoContext.FullTimeInstructors.Where(c => c.Name == Instructor.Name && c.IdInstructor != Instructor.IdInstructor).FirstOrDefault();
            if (aInstructor != null)
                return BadRequest("El instructor ya existe");

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

        // Delete an instructor in our database by Id
        // Return a statusCode 200 if it was successed, otherwise return the exception
        [HttpDelete]
        [Route("Delete/{idInstructor:int}"), Authorize(Roles = "Admin")]

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
