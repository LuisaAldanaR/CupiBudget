import React from "react";
import CrudTableResultGoals from './CrudTableResultGoals';
import "../../../App.scss";

// Definition of the CrudTable component
const CrudTableGoals = ({ data }) => {

    console.log(data);

    return (
        // Main container of the component
        <div className="">
            <div className="card-body background-gradient">
                <div className="table-responsive">
                    {/* Table header for the first table */}
                    <h2 className="h3Table">Total</h2>
                    <table className="table">
                    <thead className="text-center">
                            <tr>
                                <th className="thLeft">Total</th>
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
                                <th className="thRight">Margin</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.goal3.map((goal, index) => (
                                <CrudTableResultGoals
                                    key={index}
                                    goal={goal}
                                    index={index}
                                    goalsKey="goal3" // Cambiar esto a "goals1"
                                />
                            ))}
                            {data.goal4.map((goal, index) => (
                                <CrudTableResultGoals
                                    key={index}
                                    goal={goal}
                                    index={index}
                                    goalsKey="goal4" // Cambiar esto a "goals2"
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

// Export the CrudTable component for use in other parts of the application
export default CrudTableGoals;



