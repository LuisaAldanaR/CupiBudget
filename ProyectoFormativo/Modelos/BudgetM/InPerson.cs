﻿using System;
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

    public class InPerson
    {
        private List<NetworkReportInPerson> networks;

        public InPerson(List<NetworkData> networkData, List<FullTimeInstructor> instructors)
        {
            // Initialize the NetworkReport list
            networks = new List<NetworkReportInPerson>();

            // Loop through the NetworkData list and construct NetworkReport objects
            foreach (var data in networkData)
            {
                int totalGoal = data.totalGoal;
                int oldStudents = data.oldStudents;
                int idNetwork = data.idNetwork;

                networks.Add(new NetworkReportInPerson(totalGoal, oldStudents, instructors, idNetwork));
            }
        }


        public List<NetworkReportInPerson> GetNetworks()
        {
            return networks;
        }
    }
}
