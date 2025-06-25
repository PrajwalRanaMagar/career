import { useState } from "react";
import Input from "../../components/forms/input/input";
import TextArea from "../../components/forms/textArea/textArea";
import styles from "./apply.module.css";
import ApplyUI from "../../components/ApplyUi/ApplyUI";
import formConfig from "./formConfig.json";

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

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }

  function capitalizeWords(str: string) {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    formConfig.forEach((field) => {
      const value = formData[field.id as keyof FormDataType].trim();

      if (field.required && value === "") {
        newErrors[field.id] = field.error || "This field is required";
      } else if (field.pattern) {
        const pattern = new RegExp(field.pattern);
        if (!pattern.test(value)) {
          newErrors[field.id] = field.error || "Invalid input";
        }
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) {
      const formattedData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, capitalizeWords(value)])
    );
      console.log("Submitted:", formattedData);
      alert(JSON.stringify(formattedData, null, 2));
    }
  }

  return (
    <div className={styles.applypage}>
      <div className={styles.applypagefirst}>
        <ApplyUI />
        <form
          onSubmit={handleSubmit}
          className={styles.formContainer}
          noValidate
        >
          <h2 className={styles.formTitle}>Application Form</h2>

          {formConfig.map((field) => {
            const commonProps = {
              name: field.id,
              label: field.label,
              placeholder: field.placeholder,
              value: formData[field.id as keyof FormDataType],
              onChange: handleChange,
              required: field.required,
              error: errors[field.id],
            };

            return field.type ? (
              <Input key={field.id} type={field.type} {...commonProps} />
            ) : (
              <TextArea key={field.id} {...commonProps} />
            );
          })}

          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Apply;
