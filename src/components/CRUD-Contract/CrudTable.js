import React from "react";
import CrudTableRow from "./CrudTableRow";
import "./main.css";

// Definition of the CrudTable component
const CrudTable = ({ data, setDataToEdit, deleteData, showFormView }) => {
    return (
        // Main container of the component
        <div className="container">
            <div className="card-body center-table background-gradient">
                <div className="table-responsive">
                    {/* Table header */}
                    <br></br>
                    <table className="table center-table">
                        <thead>
                            <tr> 
                                <th className="thLeft">Contrato Vencido</th>
                                <th className="thTable">Nombre</th>
                                <th className="thTable">Fecha Inicio Contrato</th>
                                <th className="thTable">Fecha Fin Contrato</th>
                                <th className="thTable">Fecha Fin Curso</th>
                                <th className="thTable">Nombre de la Red</th>
                                <th className="thRight">Acciones</th>
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
                                        deleteData={deleteData}
                                        showFormView={showFormView} // Make sure to pass showFormView as a prop
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
export default CrudTable;
