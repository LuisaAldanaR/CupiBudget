import React from "react";
import CrudTableRow from "./CrudTableRow";
import "../../../App.scss";

// Definition of the CrudTable component
const CrudTableGoals = ({ data, setDataToEdit, updateData, handleFormChange, formData }) => {
    return (
        // Main container of the component
        <div className="">
            <div className="card-body background-gradient">
                <div className="table-responsive">
                    {/* Table header for the first table */}
                    <h2 className="h3Table">Meta</h2>
                    <table className="table">
                        <thead className="text-center">
                            <tr>
                                <th className="thLeft">Nivel Formacion</th>
                                <th className="thTable">Modalidad</th>
                                <th className="thTable">Meta</th>
                                <th className="thTable">Paso 2021 a 2022</th>
                                <th className="thTable">%</th>

                                <th className="thTable">Cupos</th>
                                <th className="thTable">Total</th>
                                <th className="thTable">%</th>
                                
                                <th className="thTable">Cupos</th>
                                <th className="thTable">Total</th>
                                <th className="thTable">%</th>
                                
                                <th className="thTable">Cupos</th>
                                <th className="thTable">Total</th>
                                <th className="thTable">%</th>

                                <th className="thTable">Cupos</th>
                                <th className="thTable">Total</th>
                                <th className="thRight">%</th>
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
