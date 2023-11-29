import React, { useState } from "react";
import "../../../App.scss";

const initialForm = {
  oldStudents: "",
  totalGoal: "",
  networkId: null,
};

const TechnologicalInPerson = ({ el }) => {
  let { networkName } = el;
  const [form, setForm] = useState(initialForm);

  // Function to handle changes in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  
  
  return (
    <tr>
      <td className="tdTableRow">
        {networkName ? (
          networkName
        ) : (
          el.loading ? (<span>Cargando...</span>) : null 
        )}
      </td>
      <td className="tdTableRow">
  <input
    type="number"
    name={`totalGoalTechnologicalInPerson${el.idNetwork}`} 
    id={`totalGoalTechnologicalInPerson${el.idNetwork}`}
    placeholder="Meta del trimestre"
    className="form-control"
    onChange={handleChange}
    value={form[`totalGoalTechnologicalInPerson${el.idNetwork}`]} 
  />
</td>

<td className="tdTableRow">
  <input
    type="number"
    name={`oldStudentsTechnologicalInPerson${el.idNetwork}`} 
    id={`oldStudentsTechnologicalInPerson${el.idNetwork}`}
    placeholder="cupos Antiguos"
    className="form-control"
    onChange={handleChange}
    value={form[`oldStudentsTechnologicalInPerson${el.idNetwork}`]} 
  />
</td>

    </tr>
  );
};

export default TechnologicalInPerson;
