import Styles from "./ApplyUI.module.css";
import React from "react";
import type { Job } from "../../types/global";

interface ApplyUIProps {
  job: Job | null;
}

const ApplyUI = ({ job }: ApplyUIProps) => {
  if (!job) return <div>No job selected</div>;

  const renderResponsibilities = (job: Job): React.ReactNode[] => {
    const elements: React.ReactNode[] = [];
    for (let i = 1; i <= 10; i++) {
      const titleKey = `Resp${i}Title` as keyof Job;
      const descKey = `Resp${i}Description` as keyof Job;
      if (job[titleKey] && job[descKey]) {
        const sentences = (job[descKey] as string)
          .split(".")
          .filter((s) => s.trim() !== "");
        elements.push(
          <div className={Styles.firstresponsibility} key={`resp-${i}`}>
            <h3>{job[titleKey] as string}</h3>
            <p>
              {sentences.map((sentence, index) => (
                <span key={index}>
                  {sentence.trim()}
                  <br />
                </span>
              ))}
            </p>
          </div>
        );
      }
    }
    return elements;
  };

  const renderQualifications = (job: Job): React.ReactNode[] => {
    const elements: React.ReactNode[] = [];
    for (let i = 1; i <= 10; i++) {
      const titleKey = `Qual${i}Title` as keyof Job;
      const descKey = `Qual${i}Description` as keyof Job;
      if (job[titleKey] && job[descKey]) {
        const qualifications = (job[descKey] as string)
          .split(".")
          .filter((s) => s.trim() !== "");
        elements.push(
          <div className={Styles.firstresponsibility} key={`qual-${i}`}>
            <h3>{job[titleKey] as string}</h3>
            <p>
              {qualifications.map((qualification, index) => (
                <span key={index}>
                  {qualification.trim()}.<br />
                </span>
              ))}
            </p>
          </div>
        );
      }
    }
    return elements;
  };

  return (
    <div className={Styles.applyui}>
      <div className={Styles.applyuifirst}>
        <div className={Styles.applyuifirstdiv}>
          <h1>{job.JobTitle}</h1>
          <p>{job.Description}</p>
        </div>

        <div className={Styles.applyuiseconddiv}>
          <h2>Responsibilities</h2>
          {renderResponsibilities(job)}
        </div>

        <div className={Styles.applyuithirddiv}>
          <h2>Qualifications</h2>
          {renderQualifications(job)}
        </div>
      </div>
    </div>
  );
};

export default ApplyUI;
