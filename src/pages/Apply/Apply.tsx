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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("https://sheetdb.io/api/v1/j21d50z7ikfmy?sheet=rawSheetFields")
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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file uploads specifically
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      // Store the file name (in production, you'd upload to a file storage service)
      setFormData((prev) => ({ ...prev, [name]: files[0].name }));
    }
  };

  const capitalizeWords = (str: string) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => {
        if (key === "fullName" || key === "address") {
          return [key, capitalizeWords(value)];
        }
        return [key, value];
      })
    );

    console.log("Submitted:", formattedData);
    axios
      .post(
        "https://sheetdb.io/api/v1/ttq7ojloc9149?sheet=apply",
        formattedData
      )
      .then((response) => {
        console.log("Data sent successfully:", response);
        alert("Form submitted successfully!");

        // Reset form data properly
        const resetData: FormDataType = {};
        sheetFields.forEach((field) => {
          resetData[field.id] = "";
        });
        setFormData(resetData);
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
          <form onSubmit={handleSubmit} className={styles.formContainer}>
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
                  };

                  // Custom UI for CV upload field
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
                              setFormData((prev) => ({
                                ...prev,
                                cv: files[0].name,
                              }));
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
                        {formData.cv && typeof formData.cv !== "string" && (
                          <p className={styles.fileName}>
                            Selected: {(formData.cv as File).name}
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
