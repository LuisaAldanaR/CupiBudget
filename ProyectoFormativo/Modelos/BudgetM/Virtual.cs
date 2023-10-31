using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Nodes;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Collections.Generic;
using Microsoft.OpenApi.Any;
using System.Text.Json;
using ProyectoFormativo.Modelos.InstructorM;

namespace ProyectoFormativo.Modelos.BudgetM
{

    public class Virtual
    {
        private List<NetworkReportVirtual> networks;
        private List<FullTimeInstructor> emptyInstructors;

        public Virtual(List<NetworkData> networkData)
        {
            // Initialize the NetworkReport list
            networks = new List<NetworkReportVirtual>();
            emptyInstructors = new List<FullTimeInstructor>();

            // Loop through the NetworkData list and construct NetworkReport objects
            foreach (var data in networkData)
            {
                int totalGoal = data.totalGoal;
                int oldStudents = data.oldStudents;
                int idNetwork = data.idNetwork;

                networks.Add(new NetworkReportVirtual(totalGoal, oldStudents, idNetwork));
            }
        }

        public List<NetworkReportVirtual> GetNetworks()
        {
            return networks;
        }
    }
}
