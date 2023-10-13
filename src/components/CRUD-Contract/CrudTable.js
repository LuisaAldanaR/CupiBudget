import React, { useState } from "react";
import CrudTableRow from "./CrudTableRow";
import "../../App.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortAlphaDown, faSortAlphaUp } from "@fortawesome/free-solid-svg-icons";

const CrudTable = ({ data, setDataToEdit, deleteData, showFormView }) => {
    const [isAscending, setIsAscending] = useState(true);
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [searchNetwork, setSearchNetwork] = useState("");
    const [showSearchNetwork, setShowSearchNetwork] = useState(false);

    // Función para alternar la dirección de ordenación
    const toggleSortingDirection = () => {
        setIsAscending(!isAscending);
    };

    const searcher = (e) => {
        setSearch(e.target.value);
        console.log(e.target.value);
    }

    // Filter Method


    const clearInput = () => {
        document.getElementById('mysearch').value = '';
        setSearch(''); // Restablece la búsqueda a una cadena vacía
    };



    const toggleSearch = () => {
        setShowSearch(!showSearch); // Alternar la visibilidad de la barra de búsqueda
    };

    const sortDataByName = () => {
        let sortedData = [...data];
        sortedData.sort((a, b) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
            return isAscending ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
        });
        if (search) {
            sortedData = data.filter((info) => info.name.toLowerCase().includes(search.toLowerCase()));
            sortedData.sort((a, b) => {
                const nameA = a.name.toLowerCase();
                const nameB = b.name.toLowerCase();
                return isAscending ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
            });
        }
        // Hacer algo con sortedData, como mostrarlo en la interfaz de usuario o devolverlo
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

                                    <button style={{ marginLeft: "1rem" }} onClick={toggleSortingDirection}>
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
                            <tr>
                                <div className={`searchBarContractName ${showSearch ? 'active' : ''}`}>
                                    <div className="iconSearch" onClick={toggleSearch}></div>
                                    <div className="inputSearch">
                                        <input id="mysearch" value={search} onChange={searcher} type="text" placeholder="Buscar por nombre"></input>
                                        <span className="clear" onClick={clearInput}></span>
                                    </div>
                                </div>
                            </tr>
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


/*  <div className={`searchBar ${showSearch ? 'active' : ''}`}>
<div className="iconSearch" onClick={toggleSearch}></div>
<div className="inputSearch">
<input  id="mysearch" value={search} onChange={searcher} type="text" placeholder="Buscar por nombre"></input>
<span className="clear" onClick={clearInput}></span>
</div>
</div> */