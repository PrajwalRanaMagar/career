import React from "react";
import styles from "./cards.module.css"; // Make sure this CSS module exists
import jobs from "../../jobs.json"; // Your jobs data

// Card Component Definitions
export const Card = ({ children }) => {
  return <div className={styles.card}>{children}</div>;
};

export const CardHeader = ({ children }) => {
  return <div className={styles["card-header"]}>{children}</div>;
};

export const CardBody = ({ children }) => {
  return <div className={styles["card-body"]}>{children}</div>;
};

export const CardFooter = ({ children }) => {
  return <div className={styles["card-footer"]}>{children}</div>;
};

// FullCard Component (Renders Cards)
const Cards= () => {
  const selectedJobs = [jobs[0], jobs[3], jobs[2], jobs[5]];

  return (
    <div>
      {selectedJobs.map((job, index) => (
        <Card key={index}>
          <CardHeader>
            <h1>{job.jobTitle}</h1>
            <button>Apply Now</button>
          </CardHeader>
          <CardBody>
            <span>Job Type: {job.jobType}</span>
            <p>{job.description}</p>
          </CardBody>
          <CardFooter>
            <span></span>
            <span>Work Arrangement: {job.workArrangement}</span>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Cards;
