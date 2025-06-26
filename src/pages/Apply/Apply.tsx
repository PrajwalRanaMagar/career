import { useState } from "react";
import Input from "../../components/forms/input/input";
import TextArea from "../../components/forms/textArea/textArea";
import styles from "./apply.module.css";
import ApplyUI from "../../components/ApplyUi/ApplyUI";
import rawSheetFields from "./rawSheetFields.json";

type FormDataType = {
  [key: string]: string;
};

const patternMap: Record<string, { pattern: string; defaultError: string }> = {
  Email: {
    pattern: "^[\\w.-]+@[\\w.-]+\\.\\w+$",
    defaultError: "Enter a valid email address",
  },
  Phone: {
    pattern: "^\\d{10}$",
    defaultError: "Phone number must be exactly 10 digits",
  },
  Name: {
    pattern: "^[A-Za-z\\s]{3,}$",
    defaultError: "Full name must be at least 3 letters",
  },
};

const formConfig = rawSheetFields.map((field) => {
  const validation = patternMap[field["Validation Type"]] || {};

  return {
    id: field["Field ID"],
    label: field["Label"],
    type: field.Type === "textarea" ? undefined : field.Type,
    placeholder: field.Placeholder,
    required: field.Required.toLowerCase() === "yes",
    pattern: validation.pattern || undefined,
    error: field["Error"] || validation.defaultError || undefined,
  };
});

function Apply() {
  const initialFormData: FormDataType = {};
  formConfig.forEach((field) => {
    initialFormData[field.id] = "";
  });

  const [formData, setFormData] = useState<FormDataType>(initialFormData);
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
        Object.entries(formData).map(([key, value]) => {
          if (key === "fullName" || key === "address") {
            return [key, capitalizeWords(value)];
          }
          return [key, value];
        })
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
