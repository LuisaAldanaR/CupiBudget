import React, { useState } from "react";
import "../../../App.scss";

const initialForm = {
  oldStudents: "",
  totalGoal: "",
  networkId: null,
};

const TechnologicalVirtual = ({ el }) => {
  let { networkName } = el;
  const [form, setForm] = useState(initialForm);

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
    name={`totalGoalTechnologicalVirtual${el.idNetwork}`} 
    id={`totalGoalTechnologicalVirtual${el.idNetwork}`}
    placeholder="Meta del trimestre"
    className="form-control"
    onChange={handleChange}
    value={form[`totalGoalTechnologicalVirtual${el.idNetwork}`]} 
  />
</td>

<td className="tdTableRow">
  <input
    type="number"
    name={`oldStudentsTechnologicalVirtual${el.idNetwork}`} 
    id={`oldStudentsTechnologicalVirtual${el.idNetwork}`}
    placeholder="cupos Antiguos"
    className="form-control"
    onChange={handleChange}
    value={form[`oldStudentsTechnologicalVirtual${el.idNetwork}`]} 
  />
</td>

    </tr>
  );
};

export default TechnologicalVirtual;
