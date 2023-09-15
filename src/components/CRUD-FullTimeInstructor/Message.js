import React from "react";

// Definition of a Message component that accepts two properties: msg and bgColor
const Message = ({ msg, bgColor }) => {
  // Definition of styles for the component
  let styles = {
    padding: "1rem",
    marginBottom: "1rem",
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    backgroundColor: bgColor,
  };

  return (
    // Rendering of the component
    <div style={styles}>
      {/* Rendering of the HTML message safely */}
      <p dangerouslySetInnerHTML={{ __html: msg }} />
    </div>
  );
};

// Export the Message component for use in other parts of the application
export default Message;
