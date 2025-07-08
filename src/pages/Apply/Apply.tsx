import { useState, useEffect } from "react";
import axios from "axios";
import Input from "../../components/forms/input/input";
import TextArea from "../../components/forms/textArea/textArea";
import styles from "./apply.module.css";
import ApplyUI from "../../components/ApplyUi/ApplyUI";
// import formConfig from "./formConfig.json";

type FormDataType = {
  [key: string]: string;
};

type SheetField = {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  required: boolean;
};

function Apply() {
  const [formData, setFormData] = useState<FormDataType>({});
  const [sheetFields, setSheetFields] = useState<SheetField[]>([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("https://sheetdb.io/api/v1/7y07lf9evok4h?sheet=rawSheetFields")
      .then((response) => {
        console.log("Raw keys from first item:", Object.keys(response.data[0]));

        // Clean keys by trimming spaces (if any)
        const fetchedFields: SheetField[] = response.data.map((field: any) => {
          const cleanField: { [key: string]: any } = {};
          Object.entries(field).forEach(([k, v]) => {
            cleanField[k.trim()] = v;
          });

          return {
            id: cleanField["Field ID"],
            label: cleanField["Label"],
            type: cleanField["Type"] || "",
            placeholder: cleanField["Placeholder"] || "",
            required: cleanField["Required"]?.toLowerCase() === "true",
          };
        });

        console.log("Mapped fields:", fetchedFields);

        setSheetFields(fetchedFields);

        const initialFormData: FormDataType = {};
        fetchedFields.forEach((field) => {
          initialFormData[field.id] = "";
        });
        setFormData(initialFormData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => setLoading(false));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "phone") {
      // Remove non-digits and limit to 10 characters
      let numericValue = value.replace(/\D/g, "");
      if (numericValue.length > 10) {
        numericValue = numericValue.slice(0, 10);
      }
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      const allowedExtensions = [".pdf", ".doc", ".docx"];
      const extension = file.name
        .slice(file.name.lastIndexOf("."))
        .toLowerCase();

      if (allowedExtensions.includes(extension)) {
        setFormData((prev) => ({ ...prev, [name]: file.name }));
        setErrors((prev) => ({ ...prev, [name]: "" })); // clear any previous error
      } else {
        setFormData((prev) => ({ ...prev, [name]: "" })); // clear invalid file
        setErrors((prev) => ({
          ...prev,
          [name]: "Only PDF, DOC, or DOCX files allowed",
        }));
      }
    }
  };

  const capitalizeWords = (str: string) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    sheetFields.forEach((field) => {
      const value = formData[field.id];

      if (field.required && !value) {
        newErrors[field.id] = `${field.label} is required`;
      }

      if (field.type === "file" && value) {
        const allowedExtensions = [".pdf", ".doc", ".docx"];
        const fileExtension = value.slice(value.lastIndexOf(".")).toLowerCase();
        if (!allowedExtensions.includes(fileExtension)) {
          newErrors[field.id] = `Only PDF, DOC, or DOCX files allowed`;
        }
      }

      if (
        ["linkedin", "portfolio"].includes(field.id) &&
        value &&
        !/^https?:\/\/.+\..+/.test(value)
      ) {
        newErrors[field.id] = `${field.label} must be a valid URL`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      alert("Please fix the errors before submitting.");
      return;
    }

    const formattedData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => {
        if (key === "fullName" || key === "address") {
          return [key, capitalizeWords(value)];
        }
        return [key, value];
      })
    );

    //   alert("Form submitted successfully!");
    //   alert(JSON.stringify(formattedData, null, 2));

    //   const resetData: FormDataType = {};
    //   sheetFields.forEach((field) => {
    //     resetData[field.id] = "";
    //   });
    //   setFormData(resetData);
    //   setErrors({});
    // };
    console.log("Submitted:", formattedData);
    axios
      .post(
        "https://script.google.com/macros/s/AKfycbzpOeUhQl3TCtl803p_3UZCWd6_6lsDAVnRNQRHSYX7yPEubrP3UdFb3aZdZm9aTNXOVA/exec?sheet=sheet4",
        formattedData
      )
      .then((response) => {
        console.log("Data sent successfully:", response);
        alert("Form submitted successfully!");

        // // Reset form data properly
        // const resetData: FormDataType = {};
        // sheetFields.forEach((field) => {
        //   resetData[field.id] = "";
        // });
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          address: "",
          experience: "",
          coverLetter: "",
          linkedin: "",
          portfolio: "",
          cv: "",
        });
        setErrors({});
        // Refresh data after successful submission
        fetchData();
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        alert("Something went wrong. Please try again.");
      });
    alert(JSON.stringify(formattedData, null, 2));
  };

  return (
    <div className={styles.applypage}>
      <div className={styles.applypagefirst}>
        <ApplyUI />

        {loading ? (
          <p>Loading form...</p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className={styles.formContainer}
            noValidate
          >
            <h2 className={styles.formTitle}>Application Form</h2>

            {/* Personal Information Section */}
            <h3 className={styles.sectionHeader}>Personal Information</h3>
            <div className={styles.twoColumnGrid}>
              {sheetFields
                .filter(
                  (field) =>
                    ![
                      "experience",
                      "coverLetter",
                      "linkedin",
                      "portfolio",
                      "cv",
                    ].includes(field.id)
                )
                .map((field, index) => {
                  const commonProps = {
                    name: field.id,
                    label: field.label,
                    placeholder: field.placeholder,
                    value: formData[field.id] || "",
                    onChange: handleChange,
                    required: field.required,
                    error: errors[field.id],
                  };

                  return field.type ? (
                    <Input
                      key={field.id || index}
                      type={field.type}
                      {...commonProps}
                      onFileChange={handleFileChange}
                    />
                  ) : (
                    <TextArea key={field.id || index} {...commonProps} />
                  );
                })}
            </div>

            {/* Application Details Section */}
            <h3 className={styles.sectionHeader}>Application Details</h3>
            <div className={styles.fullWidthGroup}>
              {sheetFields
                .filter((field) =>
                  [
                    "experience",
                    "coverLetter",
                    "linkedin",
                    "portfolio",
                    "cv",
                  ].includes(field.id)
                )
                .map((field, index) => {
                  const commonProps = {
                    name: field.id,
                    label: field.label,
                    placeholder: field.placeholder,
                    value: formData[field.id] || "",
                    onChange: handleChange,
                    required: field.required,
                    error: errors[field.id],
                  };

                  // Custom UI for CV upload field drag and drop
                  if (field.id === "cv") {
                    return (
                      <div
                        key={field.id || index}
                        className={styles.cvUploadSection}
                      >
                        <div
                          className={styles.cvDropZone}
                          onDrop={(e) => {
                            e.preventDefault();
                            const files = e.dataTransfer.files;

                            if (files && files[0]) {
                              const file = files[0];
                              const allowedExtensions = [
                                ".pdf",
                                ".doc",
                                ".docx",
                              ];
                              const extension = file.name
                                .slice(file.name.lastIndexOf("."))
                                .toLowerCase();

                              if (allowedExtensions.includes(extension)) {
                                setFormData((prev) => ({
                                  ...prev,
                                  cv: file.name,
                                }));
                                setErrors((prev) => ({ ...prev, cv: "" }));
                              } else {
                                setFormData((prev) => ({ ...prev, cv: "" }));
                                setErrors((prev) => ({
                                  ...prev,
                                  cv: "Only PDF, DOC, or DOCX files allowed",
                                }));
                              }
                            }
                          }}
                          onDragOver={(e) => e.preventDefault()}
                          onDragEnter={(e) => e.preventDefault()}
                        >
                          <h3 className={styles.cvTitle}>{field.label}</h3>
                          <p className={styles.cvDescription}>
                            Drag and drop or browse to upload your CV
                          </p>
                          <label htmlFor="cv" className={styles.uploadButton}>
                            Upload CV
                          </label>
                          <input
                            type="file"
                            name="cv"
                            id="cv"
                            className={styles.hiddenFileInput}
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                          />
                        </div>
                        {errors["cv"] && (
                          <p className={styles.errorMessage}>{errors["cv"]}</p>
                        )}
                        {formData.cv && !errors["cv"] && (
                          <p className={styles.fileName}>
                            Selected: {formData.cv}
                          </p>
                        )}
                      </div>
                    );
                  }

                  return field.type ? (
                    <Input
                      key={field.id || index}
                      type={field.type}
                      {...commonProps}
                      onFileChange={handleFileChange}
                    />
                  ) : (
                    <TextArea key={field.id || index} {...commonProps} />
                  );
                })}
            </div>

            <button type="submit" className={styles.submitButton}>
              Submit Application
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Apply;
