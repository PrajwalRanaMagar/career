import React from "react";

const DocViewer = ({ link }) => {
  return (
    <div className="doc-container">
      <iframe title="Job Description" src={link}></iframe>
    </div>
  );
};

export default DocViewer;
