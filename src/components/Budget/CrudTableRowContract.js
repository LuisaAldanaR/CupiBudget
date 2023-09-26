// CrudTableRow2.js
import React, { useState } from "react";
import Swal from "sweetalert2";

const initialForm = {
  oldStudents: "",
  totalGoal: "",
  networkId: null,
};

const CrudTableRow2 = ({ el, setDataToEdit, updateData,  handleFormChange, formData }) => {
  let { networkName, idNetwork } = el;
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });

    handleFormChange(el.idNetwork, name, value);

  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!form.totalGoal || !form.oldStudents) {
      Swal.fire("¡Faltan campos por llenar!", "", "question");
      return;
    }
  
    const newData = {
      data2: [
        {
          totalGoal: Number(form.totalGoal),
          oldStudents: Number(form.oldStudents),
          idNetwork: Number(el.idNetwork),
        },
      ],
    };
  
    const newDataString = JSON.stringify(newData);
  
    console.log(newDataString);
  
    updateData(newDataString);
  
    handleReset();
  };
  
  const handleReset = () => {
    setForm(initialForm);
    setDataToEdit(null);
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
          name="totalGoal"
          placeholder="Meta del trimestre"
          className="form-control"
          onChange={handleChange}
          value={form.totalGoal}
        />
      </td>

      <td className="tdTableRow">
        <input
          type="number"
          name="oldStudents"
          placeholder="cupos Antiguos"
          className="form-control"
          onChange={handleChange}
          value={form.oldStudents}
        />
      </td>
      <td className="tdTableRow">
        <button
          className="btn btn-success btn-send"
          onClick={handleSubmit}
        >
          Enviar
        </button>
      </td>
    </tr>
  );
};

export default CrudTableRow2;
