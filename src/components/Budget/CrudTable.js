import React from "react";
import CrudTableRow from "./CrudTableRow";
import "../../App.scss";

// Definition of the CrudTable component
const CrudTable = ({ data, setDataToEdit, updateData, handleFormChange, formData }) => {
    return (
        // Main container of the component
        <div className="container">
            <div className="card-body center-table background-gradient">
                <div className="table-responsive">
                    {/* Table header */}
                    <br></br>
                    <table className="table center-
                    
                    table">
                        <thead>
                            <tr>
                                <th className="thLeft">Nombre de la Red</th>
                                <th className="thTable">Metas</th>
                                <th className="thTable">Cupos Antiguos</th>
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
                                        updateData={updateData}
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
export default CrudTable;
