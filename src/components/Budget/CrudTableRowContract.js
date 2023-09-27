import React, { useState } from "react";

const initialForm = {
  oldStudents: "",
  totalGoal: "",
  networkId: null,
};

const CrudTableRow2 = ({ el }) => {
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
    name={`totalGoalTechnical${el.idNetwork}`} 
    id={`totalGoalTechnical${el.idNetwork}`}
    placeholder="Meta del trimestre"
    className="form-control"
    onChange={handleChange}
    value={form[`totalGoalTechnical${el.idNetwork}`]} 
  />
</td>

<td className="tdTableRow">
  <input
    type="number"
    name={`oldStudentsTechnical${el.idNetwork}`} 
    id={`oldStudentsTechnical${el.idNetwork}`}
    placeholder="cupos Antiguos"
    className="form-control"
    onChange={handleChange}
    value={form[`oldStudentsTechnical${el.idNetwork}`]} 
  />
</td>

    </tr>
  );
};

export default CrudTableRow2;
