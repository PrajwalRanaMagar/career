import { useState } from "react";
import Input from "../../components/forms/input/input";
import TextArea from "../../components/forms/textArea/textArea";
import styles from "./apply.module.css";
import { useLocation } from "react-router-dom";

type FormDataType = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
};

function Apply() {
  const location = useLocation();
  const job = location.state?.job;

  const [formData, setFormData] = useState<FormDataType>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });

  function handleChange(e: any) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    console.log("Submitted:", formData);
    alert(JSON.stringify(formData, null, 2));
  }

  return (
    <div className={styles.applypage}>
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

      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <h2 className={styles.formTitle}>Application Form</h2>

        <Input
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />

        <Input
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <Input
          label="Phone Number"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          required
          pattern="\d{10}"
        />

        <TextArea
          label="Current Address / Location"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Apply;
