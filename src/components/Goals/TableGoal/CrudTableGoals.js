import React from 'react';
import CrudTableRow from './CrudTableRow';
import '../../../App.scss';

const CrudTableGoals = ({ data, handleFormChange }) => {

    return (
        <div className="">
            <div className="card-body background-gradient">
                <div className="table-responsive">
                    <h2 className="h3Table">Meta</h2>
                    <table className="table">
                        <thead className="text-center">
                            <tr>
                                <th className="thLeft">Nivel Formacion</th>
                                <th className="thTable">Modalidad</th>
                                <th className="thTable">Meta</th>
                                <th className="thTable">Paso 2021 a 2022</th>
                                <th className="thTable">%</th>

                                <th className="thTable">Cupos</th>
                                <th className="thTable">Total</th>
                                <th className="thTable">%</th>

                                <th className="thTable">Cupos</th>
                                <th className="thTable">Total</th>
                                <th className="thTable">%</th>

                                <th className="thTable">Cupos</th>
                                <th className="thTable">Total</th>
                                <th className="thTable">%</th>

                                <th className="thTable">Cupos</th>
                                <th className="thTable">Total</th>
                                <th className="thTable">%</th>
                                <th className="thRight">Margen</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.goals1.map((goal, index) => (
                                <CrudTableRow
                                    key={index}
                                    goal={goal}
                                    index={index}
                                    goalsKey="goals1" // Cambiar esto a "goals1"
                                    handleFormChange={handleFormChange}
                                />
                            ))}
                            {data.goals2.map((goal, index) => (
                                <CrudTableRow
                                    key={index}
                                    goal={goal}
                                    index={index}
                                    goalsKey="goals2" // Cambiar esto a "goals2"
                                    handleFormChange={handleFormChange}
                                />
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default CrudTableGoals;
