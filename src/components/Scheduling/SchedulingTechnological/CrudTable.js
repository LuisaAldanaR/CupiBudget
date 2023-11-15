import React from "react";
import CrudTableRow from "./CrudTableRow";
import "../../../App.scss";

// Definition of the CrudTable component
const CrudTable = ({ data,  }) => {
    return (
        // Main container of the component
        <div className="">
            <div className="card-body background-gradient">
                <div className="table-responsive">
                    {/* Table header */}
                    <br></br>
                    <table className="table">
                        <thead className="text-center">
                            <tr> 
                                <th className="thLeft">Nivel de Formación</th>
                                <th className="thTable">Modalidad</th>
                                <th className="thTable">Nombre</th>
                                <th className="thTable">Valido Hasta</th>
                                <th className="thTable">SniesCodigo</th>
                                <th className="thTable">Numero de Resolución</th>
                                <th className="thRight">Fecha de Resolución</th>
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
