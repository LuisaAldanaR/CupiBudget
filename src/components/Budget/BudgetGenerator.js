import React, { useState } from "react";

const BudgetGenerator = () => {
  const [db, setDb] = useState([]); 
  const [error, setError] = useState(null);
  const [dataToEdit, setDataToEdit] = useState(null); 


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

    </div>
  );
};

export default BudgetGenerator;
