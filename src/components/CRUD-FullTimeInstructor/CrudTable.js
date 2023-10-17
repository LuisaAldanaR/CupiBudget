import React, { useState } from "react";
import CrudTableRow from "./CrudTableRow";
import "../../App.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortAlphaDown,
  faSortAlphaUp,
} from "@fortawesome/free-solid-svg-icons";

const CrudTable = ({
  data,
  setDataToEdit,
  deleteData,
  showFormViewFullTimeInstructor,
}) => {
  const [isAscending, setIsAscending] = useState(true);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [searchNetwork, setSearchNetwork] = useState("");
  const [showSearchNetwork, setShowSearchNetwork] = useState(false);

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
  };

  const searcherNetwork = (e) => {
    setSearchNetwork(e.target.value);
  };

  const clearInput = () => {
    setSearch("");
  };

  const clearInputNetwork = () => {
    setSearchNetwork("");
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const toggleSearchNetwork = () => {
    setShowSearchNetwork(!showSearchNetwork);
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
      <div className="card-body background-gradient">
        <div className="table-responsive">
          <br></br>
          <table className="table">
            <thead className="text-center">
              <tr>
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
                <th className="thTable">Posición</th>
                <th className="thTable">Fecha Fin de Curso</th>
                <th className="thTable">Nombre de la Red</th>
                <th className="thRight">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div
                    className={`searchBarFTIName ${showSearch ? "active" : ""}`}
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
                <td>
                  <div
                    className={`searchBarFTINetwork ${
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
                  showFormViewFullTimeInstructor={
                    showFormViewFullTimeInstructor
                  }
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
