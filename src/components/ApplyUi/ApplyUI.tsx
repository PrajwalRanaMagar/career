import styles from "./ApplyUI.module.css";
import { useLocation } from "react-router-dom";
const ApplyUI = () => {
  const location = useLocation();
  const job = location.state?.job;
  return (
    <div>
      {job && (
        <div className={styles.jobInfo}>
          <h1>{job.jobTitle}</h1>
          <p>
            <strong>Job Title:</strong> {job.jobTitle}
          </p>
          <p>
            <strong>Job Type:</strong> {job.jobType}
          </p>
          <p>
            <strong>Employment Type:</strong> {job.employmentType}
          </p>
          <p>
            <strong>Work Arrangement:</strong> {job.workArrangement}
          </p>
          <p>
            <strong>Location:</strong> {job.location}
          </p>
          <p>
            <strong>Description:</strong> {job.description}
          </p>
          <p>
            <strong>Application Deadline:</strong> {job.applicationDeadline}
          </p>
          <p>
            <strong>Visibility:</strong> {job.visibility}
          </p>
          {job.skillsRequired && (
            <p>
              <strong>Skills Required:</strong> {job.skillsRequired.join(", ")}
            </p>
          )}
          {job.salaryRange && (
            <p>
              <strong>Salary Range:</strong> {job.salaryRange}
            </p>
          )}
          {job.experienceLevel && (
            <p>
              <strong>Experience Level:</strong> {job.experienceLevel}
            </p>
          )}
          {job.educationRequired && (
            <p>
              <strong>Education Required:</strong> {job.educationRequired}
            </p>
          )}
          {job.shift && (
            <p>
              <strong>Shift:</strong> {job.shift}
            </p>
          )}
          {job.portfolioRequired !== undefined && (
            <p>
              <strong>Portfolio Required:</strong>{" "}
              {job.portfolioRequired ? "Yes" : "No"}
            </p>
          )}
          {job.benefits && (
            <p>
              <strong>Benefits:</strong> {job.benefits.join(", ")}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ApplyUI;
