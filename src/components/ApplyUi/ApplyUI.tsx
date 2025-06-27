import Styles from "./ApplyUI.module.css";
import React from "react";

const ApplyUI = ({ job }) => {
  if (!job) return <p>No job selected.</p>;

  // ⬇️ Responsibilities
  const renderResponsibilities = (job) => {
    const elements = [];
    for (let i = 1; i <= 10; i++) {
      const titleKey = `Resp${i}Title`;
      const descKey = `Resp${i}Description`;
      if (job[titleKey] && job[descKey]) {
        elements.push(
          <div className={Styles.firstresponsibility} key={`resp-${i}`}>
            <h3>{job[titleKey]}</h3>
            <p>{job[descKey]}</p>
          </div>
        );
      }
    }
    return elements;
  };

  // ⬇️ Qualifications
  const renderQualifications = (job) => {
    const elements = [];
    for (let i = 1; i <= 10; i++) {
      const titleKey = `Qual${i}Title`;
      const descKey = `Qual${i}Description`;
      if (job[titleKey] && job[descKey]) {
        elements.push(
          <div className={Styles.firstqualification} key={`qual-${i}`}>
            <h3>{job[titleKey]}</h3>
            <p>{job[descKey]}</p>
          </div>
        );
      }
    }
    return elements;
  };

  return (
    <div className={Styles.applyui}>
      <div>
        <h1>{job.JobTitle}</h1>
        <p>{job.Description}</p>

        <div>
          <h2>Responsibilities</h2>
          {renderResponsibilities(job)}
        </div>

        <div className={Styles.qulaifications}>
          <h2>Qualifications</h2>
          {renderQualifications(job)}
        </div>
      </div>
    </div>
  );
};

export default ApplyUI;
