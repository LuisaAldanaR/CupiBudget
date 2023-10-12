import React, { useState } from "react";
import CrudTableRow from "./CrudTableRow";
import "../../App.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortAlphaDown, faSortAlphaUp } from "@fortawesome/free-solid-svg-icons";

const CrudTable = ({ data, setDataToEdit, deleteData, showFormView }) => {
    const [isAscending, setIsAscending] = useState(true);

    // Función para alternar la dirección de ordenación
    const toggleSortingDirection = () => {
      setIsAscending(!isAscending);
    };

    // Función para ordenar los datos por nombre
    const sortDataByName = () => {
      const sortedData = [...data];
      sortedData.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        return isAscending ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
      });
      return sortedData;
    };

    return (
        <div className="">
            <br></br>
            <div className="card-body background-gradient">
                <div className="table-responsive">
                    {/* Table header */}
                    <br></br>
                    <table className="table">
                        <thead className="text-center">
                            <tr> 
                                <th className="thLeft">Contrato Vencido</th>
                                <th className="thTable">
                                    Nombre
                                    <button style={{marginLeft:"1rem"}} onClick={toggleSortingDirection}>
                                        {isAscending ? (
                                          <FontAwesomeIcon icon={faSortAlphaDown} />
                                        ) : (
                                          <FontAwesomeIcon icon={faSortAlphaUp} />
                                        )}
                                    </button>
                                </th>
                                <th className="thTable">Fecha Inicio Contrato</th>
                                <th className="thTable">Fecha Fin Contrato</th>
                                <th className="thTable">Fecha Fin Curso</th>
                                <th className="thTable">Nombre de la Red</th>
                                <th className="thRight">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortDataByName().map((el) => (
                                <CrudTableRow
                                  key={el.id}
                                  el={el}
                                  setDataToEdit={setDataToEdit}
                                  deleteData={deleteData}
                                  showFormView={showFormView}
                                />
                            ))}
                            {data.length === 0 && (
                                <tr>
                                    <td colSpan="7">No se encuentran resultados</td>
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
