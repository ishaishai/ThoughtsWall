import React from "react";

const Alert = ({ AlertTitle, AlertText, AlertType }) => {
  return (
    <div className={`alert-container ${AlertType}`}>
      <div className="alert-title">{AlertTitle}</div>
      <div className="alert-text">{AlertText}</div>
    </div>
  );
};

export default Alert;
