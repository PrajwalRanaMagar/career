import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Styles from "./ApplyUI.module.css";
import type { Job } from "../../types/global";

const ApplyUI = () => {
  const location = useLocation();
  const job = location.state?.job as Job | undefined;
  if (!job) {
    return (
      <div className={Styles.applyui}>
        <div className={Styles.applyuicontainer}>
          <p className={Styles.errormessage}>Job details not available.</p>
        </div>
      </div>
    );
  }
  const navigate = useNavigate();
  const Breadcrumb = () => (
    <div className={Styles.breadcrumb}>
      <span onClick={() => navigate("/Home")} className={Styles.homebreadcrumb}>
        Careers
      </span>
      /
      <span onClick={() => navigate(0)} className={Styles.titlebreadcrumb}>
        {job.JobTitle}
      </span>
    </div>
  );

  const renderResponsibilities = (job: Job): React.ReactNode[] => {
    const elements: React.ReactNode[] = [];
    for (let i = 1; i <= 10; i++) {
      const titleKey = `Responsibility${i}Title` as keyof Job;
      const descKey = `Responsibility${i}Description` as keyof Job;
      if (job[titleKey] && job[descKey]) {
        const sentences = (job[descKey] as string)
          .split(/\. (?=[A-Z])/g)

          .filter((s) => s.trim() !== "");
        elements.push(
          <div className={Styles.firstresponsibility} key={`resp-${i}`}>
            <h3>{job[titleKey] as string}</h3>
            <p>
              {sentences.map((sentence, index) => (
                <span key={index}>
                  {sentence.trim().endsWith(".")
                    ? sentence.trim()
                    : sentence.trim() + "."}
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
      const titleKey = `Qualification${i}Title` as keyof Job;
      const descKey = `Qualification${i}Description` as keyof Job;
      if (job[titleKey] && job[descKey]) {
        const qualifications = (job[descKey] as string)
          ?.split(/\. (?=[A-Z])/g)
          ?.filter((s) => s.trim() !== "");
        elements.push(
          <div className={Styles.firstresponsibility} key={`qual-${i}`}>
            <h3>{job[titleKey] as string}</h3>
            <p>
              {qualifications.map((qualification, index) => (
                <span key={index}>
                  {qualification.trim().endsWith(".")
                    ? qualification.trim()
                    : qualification.trim() + "."}
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

  return (
    <div className={Styles.applyui}>
      <div className={Styles.applyuicontainer}>
        <Breadcrumb />
        <div className={Styles.applyuifirstdiv}>
          <h1>{job?.JobTitle}</h1>
          <p>{job?.Description}</p>
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
