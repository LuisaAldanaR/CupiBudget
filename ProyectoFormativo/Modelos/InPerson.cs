using ProyectoFormativo.Modelos;
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

namespace NetworkSimulator1
{

    public class InPerson
    {
        private List<NetworkReport> networks;

        public InPerson(JsonElement json, List<FullTimeInstructor> instructores)
        {
            // Deserializa el JSON en una lista de objetos anónimos que coinciden con la estructura del JSON
            List<dynamic> jsonList = JsonConvert.DeserializeObject<List<dynamic>>(json.ToString());
            List<FullTimeInstructor> tempInstructors = instructores.ToList();
            // Inicializa la lista de NetworkReport
            networks = new List<NetworkReport>();

            // Recorre la lista deserializada y construye objetos NetworkReport
            foreach (var grupo in jsonList)
            {
                int metaTotal = grupo.metaTotal;
                int estudiantesAntiguos = grupo.estudiantesAntiguos;
                int idRed = grupo.idRed;

                networks.Add(new NetworkReport(metaTotal, estudiantesAntiguos, tempInstructors, idRed));
            }
        }

        public List<NetworkReport> GetNetworks()
        {
            return networks;
        }
    }
}
