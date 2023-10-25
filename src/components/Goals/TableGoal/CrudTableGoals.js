import React from 'react';
import CrudTableRow from './CrudTableRow';
import '../../../App.scss';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

const CrudTableGoals = ({ data, handleFormChange }) => {
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
