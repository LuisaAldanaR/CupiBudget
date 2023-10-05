import React from "react";
import CrudTableRow from "./CrudTableRow";
import "../../App.scss";

// Definition of the CrudTable component
const CrudTableGoals = ({ data, setDataToEdit, updateData, handleFormChange, formData }) => {
    return (
        // Main container of the component
        <div className="">
            <div className="card-body background-gradient">
                <div className="">
                    {/* Table header for the first table */}
                    <h2 className="h3Table">Datos de Redes Tecnológicas</h2>
                    <table className="table">
                        <thead className="text-center">
                            <tr>
                                <th className="thLeft">Planta</th>
                                <th className="thTable">Metas</th>
                                <th className="thRight">Cupos Antiguos</th>
                            </tr>
                        </thead>

                        <tbody>
                            {/* Conditional to handle the case when there is no data */}
                            {data.length > 0 ? (
                                // Mapping data to render table rows
                                data.map((el) => (
                                    <CrudTableRow
                                        key={el.id}
                                        el={el}
                                        setDataToEdit={setDataToEdit}
                                        //updateData={updateData}
                                        handleFormChange={handleFormChange}
                                        formData={formData}
                                    />
                                ))
                            ) : (
                                // Display "No data" message if there are no elements in 'data'
                                <tr>
                                    <td colSpan="3">Sin datos</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

// Export the CrudTable component for use in other parts of the application
export default CrudTableGoals;
