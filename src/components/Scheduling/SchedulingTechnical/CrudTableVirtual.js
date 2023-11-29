import React from "react";
import CrudTableRow from "./CrudTableRow";
import "../../../App.scss";

const CrudTable = ({ data,}) => {
    return (
        <div className="">
            <div className="card-body background-gradient">
                <div className="table-responsive">
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
                            {data.length > 0 ? (
                                data.map((el) => (
                                    <CrudTableRow
                                        key={el.id}
                                        el={el}    
                                    />
                                ))
                            ) : (
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

export default CrudTable;
