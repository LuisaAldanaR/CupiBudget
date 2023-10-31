using Microsoft.AspNetCore.Authorization;
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
        // Return the calculates
        [HttpPost]
        [Route("CalculateSimulator")]
        [Authorize(Roles = "Admin,Regular")]
        public IActionResult CalculatorSimulator([FromBody] SimulatorDTO request)
        {
            try
            {
                var filteredGoals = new List<GoalDTO>(); // Reemplaza "YourObjectType" con el tipo real de los objetos en goals1

                foreach (var goal in request.goals1)
                {
                    if (goal.Target != 0)
                    {
                        filteredGoals.Add(goal);
                    }
                }

                // La lista "filteredGoals" ahora contiene los objetos que cumplen con la condición "Target != 0".
                    
                var goal1 = new TrainingLevelGoal(filteredGoals).goals;

                var total1 = new List<Goal>();
                total1.Add(new TrainingLevelGoal(request.goals1).totalGoal);

                filteredGoals = new List<GoalDTO>(); // Reemplaza "YourObjectType" con el tipo real de los objetos en goals1

                foreach (var goal in request.goals2)
                {
                    if (goal.Target != 0)
                    {
                        filteredGoals.Add(goal);
                    }
                }
                var goal2 = new TrainingLevelGoal(filteredGoals).goals;

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
