import React, { type ReactNode } from "react";
import type { Job } from "../../types/global";

const DocViewer = ({ link }) => {
  return (
    <div className="doc-container">
      <iframe title="Job Description" src={link}></iframe>
    </div>
  );
};

export default DocViewer;
