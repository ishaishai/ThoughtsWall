import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <div style={{ height: "10vw", display: "flex", margin: "auto" }}>
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loader;
