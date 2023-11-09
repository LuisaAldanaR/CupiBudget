import React, { useState } from "react";
import CrudTableRow from "./CrudTableRow";
import "../../App.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortAlphaDown,
  faSortAlphaUp,
} from "@fortawesome/free-solid-svg-icons";

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
  

  const removeAccents = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

  const searcher = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  };

  // Filter Method

  const clearInput = () => {
    document.getElementById("mysearch").value = "";
    setSearch(""); // Restablece la búsqueda a una cadena vacía
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch); // Alternar la visibilidad de la barra de búsqueda
  };

  const searcherNetwork = (e) => {
    setSearchNetwork(e.target.value);
  };

  const toggleSearchNetwork = () => {
    setShowSearchNetwork(!showSearchNetwork);
  };

  const clearInputNetwork = () => {
    setSearchNetwork("");
  };

  const sortDataByName = () => {
    let sortedData = [...data];
    sortedData.sort((a, b) => {
      const nameA = removeAccents(a.name);
      const nameB = removeAccents(b.name);
      return isAscending
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });
    if (search) {
      sortedData = sortedData.filter((info) =>
        removeAccents(info.name).includes(removeAccents(search))
      );
    }
    if (searchNetwork) {
      sortedData = sortedData.filter((infoNet) =>
        removeAccents(infoNet.oNetwork.networkName).includes(
          removeAccents(searchNetwork)
        )
      );
    }
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
                  <button
                    style={{ marginLeft: "1rem" }}
                    onClick={toggleSortingDirection}
                  >
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
                <td></td>
                <td>
                  <div
                    className={`searchBarContractName ${
                      showSearch ? "active" : ""
                    }`}
                  >
                    <div className="iconSearch" onClick={toggleSearch}></div>
                    <div className="inputSearch">
                      <input
                        id="mysearch"
                        value={search}
                        onChange={searcher}
                        type="text"
                        placeholder="Buscar por nombre"
                      ></input>
                      <span className="clear" onClick={clearInput}></span>
                    </div>
                  </div>
                </td>
                <td></td>
                <td></td>
                <td> </td>
                <td>
                  <div
                    className={`searchBarContractNetwork ${
                      showSearchNetwork ? "active" : ""
                    }`}
                  >
                    <div
                      className="iconSearch"
                      onClick={toggleSearchNetwork}
                    ></div>
                    <div className="inputSearch">
                      <input
                        id="mynetwork"
                        value={searchNetwork}
                        onChange={searcherNetwork}
                        type="text"
                        placeholder="Buscar por red"
                      ></input>
                      <span
                        className="clear"
                        onClick={clearInputNetwork}
                      ></span>
                    </div>
                  </div>
                </td>
                <td></td>
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
                  {sortDataByName().length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{color:"red"}} >No se encuentran resultados</td>
                  </tr>
                ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CrudTable;
