import React from "react";
import CrudTableResultGoals from './CrudTableResultGoals';
import "../../../App.scss";
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

const CrudTableGoals = ({ data }) => {

    function show_alerta(mensaje, icono, foco = '') {
        onfocus(foco);
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: mensaje,
            icon: icono
        })
    }

    function onfocus(foco) {
        if (foco !== '') {
            document.getElementById(foco).focus();
        }
    }
    if (data.goals1 === undefined && data.goals2 === undefined) {
        show_alerta('Error: Faltan datos por enviar', 'error');
        return;
    }
    
    console.log(data);

    return (
        <div className="">
            <div className="card-body background-gradient">
                <div className="table-responsive">
                    <h2 className="h3Table">Total</h2>
                    <table className="table">
                    <thead className="text-center">
                            <tr>
                                <th className="thLeft">Total</th>
                                <th className="thTable">Meta</th>
                                <th className="thTable">Paso 2021 a 2022</th>
                                <th className="thTable">%</th>

                                <th className="thTable">Cupos1T</th>
                                <th className="thTable">Total</th>
                                <th className="thTable">%</th>
                                <th className="thTable">Fichas</th>
                                
                                <th className="thTable">Cupos2T</th>
                                <th className="thTable">Total</th>
                                <th className="thTable">%</th>
                                <th className="thTable">Fichas</th>

                                <th className="thTable">Cupos3T</th>
                                <th className="thTable">Total</th>
                                <th className="thTable">%</th>
                                <th className="thTable">Fichas</th>

                                <th className="thTable">Cupos4T</th>
                                <th className="thTable">Total</th>
                                <th className="thTable">%</th>                                
                                <th className="thTable">Fichas</th>

                                <th className="thRight">Margen</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.goal3.map((goal, index) => (
                                <CrudTableResultGoals
                                    key={index}
                                    goal={goal}
                                    index={index}
                                    goalsKey="goal3" 
                                />
                            ))}
                            {data.goal4.map((goal, index) => (
                                <CrudTableResultGoals
                                    key={index}
                                    goal={goal}
                                    index={index}
                                    goalsKey="goal4" 
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



