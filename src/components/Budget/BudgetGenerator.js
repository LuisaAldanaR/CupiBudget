import React, { useState, useEffect } from "react";
import CrudTable from "./CrudTable";
import { helpHttp } from "../../helpers/helpHttp"; // Adjust the import path

const BudgetGenerator = () => {
  const [db, setDb] = useState([]); 
  const [dataToEdit, setDataToEdit] = useState(null); 
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(true); 


  // Function to handle the budget report download
  const generateBudget = () => {
    let urlGet = "http://www.mendezmrf10.somee.com/api/PDFGenerator/Generate";

      try {
          // Create a hidden <a> element to trigger the file download
          const downloadLink = document.createElement("a");
          downloadLink.href = urlGet;
          downloadLink.target = "_blank"; // Open in a new tab
          downloadLink.download = "Reporte.pdf"; // Set the desired file name

          // Trigger the click event to start the download
          downloadLink.click();

      } catch (error) {
          console.log(error);
      }
    
  };

  let api = helpHttp(); // Instance of the HTTP request utility

  useEffect(() => {
    loadTableData(); // Load initial data when the component mounts
  }, []);

  // Function to load table data
  const loadTableData = () => {
    let urlGet = "http://www.mendezmrf10.somee.com/api/ContractInstructor/List";

    api.get(urlGet).then((res) => {
      if (!res.err) {
        setDb(res.response); // Store data in the 'db' state
        setError(null); // Clear errors
      } else {
        setDb([]); // Set an empty array in 'db' in case of an error
        setError(`Error ${res.status}: ${res.statusText}`);
      }

      setLoading(false); // Set 'loading' to false after data is loaded
    });
  };


  return (
    <div>
      <h1 className="h3Table">Generador de Reporte</h1>
      <div className="containerButtons">
        <button className="btn addButton" onClick={generateBudget}>
          Generar Reporte
        </button>
        {error && (
          <div className="alert alert-danger mt-2" role="alert">
            {error}
          </div>
        )}
      </div>

      <CrudTable
          data={db}
          setDataToEdit={setDataToEdit}
        />

    </div>
  );
};

export default BudgetGenerator;
