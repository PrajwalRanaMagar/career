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
            <strong>Applying for:</strong> {job.jobTitle}
          </p>
          <p>
            <strong>Type:</strong> {job.jobType}
          </p>
          <p>
            <strong>Arrangement:</strong> {job.workArrangement}
          </p>
          <p>
            <strong>Description:</strong> {job.description}
          </p>
          <p>
            <strong>Location:</strong>
            {job.location}
          </p>
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
