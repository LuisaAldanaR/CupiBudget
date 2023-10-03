import React from "react";
import "./Loader.css"; // Import the CSS stylesheet for the Loader component

// Definition of the Loader component
const Loader = () => {
    return (
        // Render a <div> element with the "lds-dual-ring" class to display the loader
        <div className="lds-dual-ring"></div>
    );
}

// Export the Loader component for use in other parts of the application
export default Loader;
