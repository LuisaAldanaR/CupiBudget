import React, { useState } from "react";

const initialForm = {
  oldStudents: "",
  totalGoal: "",
  networkId: null,
};

const TechnicalInPerson = ({ el }) => {
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
    name={`totalGoalTechnicalInPerson${el.idNetwork}`} 
    id={`totalGoalTechnicalInPerson${el.idNetwork}`}
    placeholder="Meta del trimestre"
    className="form-control"
    onChange={handleChange}
    value={form[`totalGoalTechnicalInPerson${el.idNetwork}`]} 
  />
</td>

<td className="tdTableRow">
  <input
    type="number"
    name={`oldStudentsTechnicalInPerson${el.idNetwork}`} 
    id={`oldStudentsTechnicalInPerson${el.idNetwork}`}
    placeholder="cupos Antiguos"
    className="form-control"
    onChange={handleChange}
    value={form[`oldStudentsTechnicalInPerson${el.idNetwork}`]} 
  />
</td>

    </tr>
  );
};

export default TechnicalInPerson;
