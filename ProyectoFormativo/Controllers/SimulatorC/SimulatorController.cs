using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProyectoFormativo.Modelos;
using ProyectoFormativo.Modelos.SimulatorM;

namespace ProyectoFormativo.Controllers.SimulatorC
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SimulatorController : ControllerBase
    {
        // Return the calculates
        [HttpPost]
        [Route("CalculateSimulator"), Authorize(Roles = "Admin,Regular")]
        public IActionResult CalculatorSimulator([FromBody] SimulatorDTO request)
        {
            try
            {
                var goal1 = new TrainingLevelGoal(request.goals1).goals;
                var total1 = new List<Goal>();
                total1.Add(new TrainingLevelGoal(request.goals1).totalGoal);
                //total1 = new TrainingLevelGoal(request.goals1).totalGoal;

                var goal2 = new TrainingLevelGoal(request.goals2).goals;
                var total2 = new List<Goal>();
                total2.Add(new TrainingLevelGoal(request.goals2).totalGoal);

                var response = new Simulator(goal1, goal2, total1 , total2);

                return StatusCode(StatusCodes.Status200OK, response);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status200OK, ex.Message);
            }
        }
    }
}
