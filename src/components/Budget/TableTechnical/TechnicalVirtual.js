import React, { useState } from "react";

const initialForm = {
  oldStudents: "",
  totalGoal: "",
  networkId: null,
};

const TechnicalVirtual = ({ el }) => {
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
    name={`totalGoalTechnicalVirtual${el.idNetwork}`} 
    id={`totalGoalTechnicalVirtual${el.idNetwork}`}
    placeholder="Meta del trimestre"
    className="form-control"
    onChange={handleChange}
    value={form[`totalGoalTechnicalVirtual${el.idNetwork}`]} 
  />
</td>

<td className="tdTableRow">
  <input
    type="number"
    name={`oldStudentsTechnicalVirtual${el.idNetwork}`} 
    id={`oldStudentsTechnicalVirtual${el.idNetwork}`}
    placeholder="cupos Antiguos"
    className="form-control"
    onChange={handleChange}
    value={form[`oldStudentsTechnicalVirtual${el.idNetwork}`]} 
  />
</td>

    </tr>
  );
};

export default TechnicalVirtual;
