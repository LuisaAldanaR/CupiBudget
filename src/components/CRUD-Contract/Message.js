import React from "react";

// Definition of a Message component that accepts two props: msg and bgColor
const Message = ({ msg, bgColor }) => {
  // Define styles for the component
  let styles = {
    padding: "1rem",
    marginBottom: "1rem",
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    backgroundColor: bgColor,
  };

  return (
    // Render the component
    <div style={styles}>
      {/* Render the HTML message safely */}
      <p dangerouslySetInnerHTML={{ __html: msg }} />
    </div>
  );
};

// Export the Message component for use in other parts of the application
export default Message;
