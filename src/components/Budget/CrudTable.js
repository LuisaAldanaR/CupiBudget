import React from "react";
import TechnologicalInPerson from "./TableTechnological/TechnologicalInPerson";
import TechnicalInPerson from "./TableTechnical/TechnicalInPerson";
import TechnologicalVirtual from "./TableTechnological/TechnologicalVirtual";
import TechnicalVirtual from "./TableTechnical/TechnicalVirtual";
import "../../App.scss";

// Definition of the CrudTable component
const CrudTable = ({ data, setDataToEdit, updateData, handleFormChange, formData }) => {
    return (

        <div className="">
            <div className="card-body background-gradient">
                <div className="">
                    <h2 className="h3Table">Datos de Redes Tecnológicas Presenciales</h2>
                    <table className="table">
                        <thead className="text-center">
                            <tr>
                                <th className="thLeft">Nombre de la Red</th>
                                <th className="thTable">Metas</th>
                                <th className="thRight">Cupos Antiguos</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.length > 0 ? (
                                data.map((el) => (
                                    <TechnologicalInPerson
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


                    <h2 className="h3Table">Datos de Redes Técnicas Presenciales</h2>
                    <table className="table">
                        <thead className="text-center">
                            <tr>

                                <th className="thLeft">Nombre de la Red</th>
                                <th className="thTable">Metas</th>
                                <th className="thRight">Cupos Antiguos</th>
                            </tr>
                        </thead>

                        <tbody>

                            {data.length > 0 ? (

                                data.map((el) => (
                                    <TechnicalInPerson
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

                    <h2 className="h3Table">Datos de Redes Tecnológicas Virtuales</h2>
                    <table className="table">
                        <thead className="text-center">
                            <tr>
                                <th className="thLeft">Nombre de la Red</th>
                                <th className="thTable">Metas</th>
                                <th className="thRight">Cupos Antiguos</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.length > 0 ? (
                                data.map((el) => (
                                    <TechnologicalVirtual
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

                    <h2 className="h3Table">Datos de Redes Técnicas Virtuales</h2>
                    <table className="table">
                        <thead className="text-center">
                            <tr>
                                <th className="thLeft">Nombre de la Red</th>
                                <th className="thTable">Metas</th>
                                <th className="thRight">Cupos Antiguos</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.length > 0 ? (
                                data.map((el) => (
                                    <TechnicalVirtual
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

export default CrudTable;
