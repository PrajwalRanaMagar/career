import { useState, useEffect } from "react";
import axios from "axios";
import Input from "../../components/forms/input/input";
import TextArea from "../../components/forms/textArea/textArea";
import styles from "./apply.module.css";
import ApplyUI from "../../components/ApplyUi/ApplyUI";
import { useLocation, useNavigate } from "react-router-dom";

// Types
type FormDataType = {
  [key: string]: string | any;
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const location = useLocation();
  const navigate = useNavigate();
  const job = location.state?.job;

  useEffect(() => {
    if (!job) {
      navigate("/"); // Redirect to career page
    }
  }, [job, navigate]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("https://sheetdb.io/api/v1/7ny0boy65naam?sheet=rawSheetFields")
      .then((response) => {
        const fetchedFields: SheetField[] = response.data.map((field: any) => {
          const cleanField: { [key: string]: any } = {};
          Object.entries(field).forEach(([k, v]) => {
            cleanField[k.trim()] = v;
          });
          return {
            id: cleanField["Field ID"],
            label: cleanField["Label"],
            type: cleanField["Type"] || "",
            placeholder: cleanField["Placeholder"] ||  `Enter your ${cleanField["Label"]}` ,
            required: cleanField["Required"]?.toLowerCase() === "true",
          };
        });

        setSheetFields(fetchedFields);

        const initialFormData: FormDataType = {};
        fetchedFields.forEach((field) => {
          initialFormData[field.id] = "";
        });
        setFormData(initialFormData);
      })
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => setLoading(false));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "phone") {
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
      const extension = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();

      if (allowedExtensions.includes(extension)) {
        setSelectedFile(file);
        setFormData((prev) => ({ ...prev, [name]: file.name }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
      } else {
        setSelectedFile(null);
        setFormData((prev) => ({ ...prev, [name]: "" }));
        setErrors((prev) => ({
          ...prev,
          [name]: "Only PDF, DOC, or DOCX files allowed",
        }));
      }
    }
  };

  const capitalizeWords = (str: string) =>
    str.replace(/\b\w/g, (char) => char.toUpperCase());

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

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      alert("Please fix the errors before submitting.");
      return;
    }

    const formattedData: any = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => {
        if (key === "fullName" || key === "address") {
          return [key, capitalizeWords(value)];
        }
        return [key, value];
      })
    );

    formattedData["JobsTitle"] = job?.JobTitle || "";

    if (selectedFile) {
      const base64String = await convertFileToBase64(selectedFile);
      formattedData["fileData"] = {
        data: base64String.split(",")[1],
        mimeType: selectedFile.type,
        fileName: selectedFile.name,
      };
    }

    axios
      .post(
        "http://localhost:3000/submit-application", 
        formattedData
      )
      .then((response) => {
        console.log("Data sent successfully:", response);
        alert("Form submitted successfully!");

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
        setSelectedFile(null);
        setErrors({});
        fetchData();
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        alert("Something went wrong. Please try again.");
      });

    console.log("Submitted:", formattedData);
  };

  return (
    <div className={styles.applypage}>
      <div className={styles.applywrapper}>
        <div className={styles.applyUIpage}>
          <ApplyUI />
        </div>

        {loading ? (
          <p>Loading form...</p>
        ) : (
          <form onSubmit={handleSubmit} className={styles.formContainer} noValidate>
            <h2 className={styles.formTitle}>Application Form</h2>

            <h3 className={styles.sectionHeader}>Personal Information</h3>
            <div className={styles.twoColumnGrid}>
              {sheetFields
                .filter((field) => !["experience", "coverLetter", "linkedin", "portfolio", "cv"].includes(field.id))
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

                  return field.type !== "textarea" ? (
                    <Input key={field.id || index} type={field.type} {...commonProps} onFileChange={handleFileChange} />
                  ) : (
                    <TextArea key={field.id || index} {...commonProps} />
                  );
                })}
            </div>

            <h3 className={styles.sectionHeader}>Application Details</h3>
            <div className={styles.fullWidthGroup}>
              {sheetFields
                .filter((field) => ["experience", "coverLetter", "linkedin", "portfolio", "cv"].includes(field.id))
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

                  if (field.id === "cv") {
                    return (
                      <div key={field.id || index} className={styles.cvUploadSection}>
                        <div
                          className={styles.cvDropZone}
                          onDrop={(e) => {
                            e.preventDefault();
                            const files = e.dataTransfer.files;

                            if (files && files[0]) {
                              const file = files[0];
                              const allowedExtensions = [".pdf", ".doc", ".docx"];
                              const extension = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();

                              if (allowedExtensions.includes(extension)) {
                                setSelectedFile(file);
                                setFormData((prev) => ({ ...prev, cv: file.name }));
                                setErrors((prev) => ({ ...prev, cv: "" }));
                              } else {
                                setSelectedFile(null);
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
                          <p className={styles.cvDescription}>Drag and drop or browse to upload your CV</p>
                          <label htmlFor="cv" className={styles.uploadButton}>Upload CV</label>
                          <input
                            type="file"
                            name="cv"
                            id="cv"
                            className={styles.hiddenFileInput}
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                          />
                        </div>
                        {errors["cv"] && <p className={styles.errorMessage}>{errors["cv"]}</p>}
                        {formData.cv && !errors["cv"] && (
                          <p className={styles.fileName}>Selected: {formData.cv}</p>
                        )}
                      </div>
                    );
                  }

                  if (field.type === "textarea") {
                    return (
                      <TextArea key={field.id || index} {...commonProps} />
                    );
                  }
                  return (
                    <Input
                      key={field.id || index}
                      type={field.type}
                      {...commonProps}
                      onFileChange={handleFileChange}
                    />
                  );
                })}
            </div>

            <button type="submit" className={styles.submitButton}>Submit Application</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Apply;
