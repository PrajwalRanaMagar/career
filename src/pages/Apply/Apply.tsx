import { useState } from "react";
import Input from "../../components/forms/input/input";
import TextArea from "../../components/forms/textArea/textArea";
import styles from "./apply.module.css";

type FormDataType = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
};

function Apply() {
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

  function handleSubmit(e:any) {
    e.preventDefault();
    console.log("Submitted:", formData);
    alert(JSON.stringify(formData, null, 2));
  }

  return (
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
  );
}

export default Apply;
