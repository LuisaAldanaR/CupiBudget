using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProyectoFormativo.Modelos;
using ProyectoFormativo.Modelos.SimulatorM;

namespace ProyectoFormativo.Controllers.SimulatorC
{
    [Route("api/[controller]")]
    [ApiController]
    public class SimulatorController : ControllerBase
    {
        [HttpPost]
        [Route("CalculateSimulator")]
        public IActionResult CalculatorSimulator([FromBody] SimulatorDTO request)
        {
            try
            {
                var goal1 = new TrainingLevelGoal(request.goals1).goals;
                var goal2 = new TrainingLevelGoal(request.goals1).totalGoal;

                var goal3 = new TrainingLevelGoal(request.goals2).goals;
                var goal4 = new TrainingLevelGoal(request.goals2).totalGoal;

                var response = new Simulator(goal1, goal2, goal3, goal4);

                return StatusCode(StatusCodes.Status200OK, response);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status200OK, ex.Message);
            }
        }
    }
}
