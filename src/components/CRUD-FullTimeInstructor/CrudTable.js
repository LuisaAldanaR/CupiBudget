import React from "react";
import CrudTableRow from "./CrudTableRow";
import "../../App.scss";

// Definition of the CrudTable component
const CrudTable = ({ data, setDataToEdit, deleteData, showFormViewFullTimeInstructor }) => {
    return (
        // Main container of the component
        <div className="">
            <div className="card-body background-gradient">
                <div className="">
                    {/* Table header */}
                    <br></br>
                    <table className="table">
                        <thead className="text-center">
                            <tr>
                                <th className="thLeft">Nombre</th> 
                                <th className="thTable">Posición</th> 
                                <th className="thTable">Fecha Fin de Curso</th> 
                                <th className="thTable">Nombre de la Red</th> 
                                <th className="thRight">Acciones</th> 
                            </tr>
                        </thead>

                        <tbody>
                            {/* Conditional to handle the case when there is no data */}
                            {data.length > 0 ? (
                                // Mapping of data to render table rows
                                data.map((el) => (
                                    <CrudTableRow
                                        key={el.id}
                                        el={el}
                                        setDataToEdit={setDataToEdit}
                                        deleteData={deleteData}
                                        showFormViewFullTimeInstructor={showFormViewFullTimeInstructor} // Make sure to pass showFormView as a prop
                                    />
                                ))
                            ) : (
                                // Show "Sin datos" message if there are no elements in 'data'
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
