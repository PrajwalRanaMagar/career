import styles from "./input.module.css";

type Props = {
  label: string;
  name: string;
  value: string ;
  onChange:  (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
   onFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
   disabled?: boolean; 
};

function Input(props: Props) {
  const {
    label,
    name,
    value,
    onChange,
    onFileChange,
    type = "text",
    placeholder,
    required,
    error,
    disabled=false,
  } = props;


   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === "file" && onFileChange) {
      onFileChange(e);
    } else {
      onChange(e);
    }
  };
  
  return (
    <div className={styles.inputWrapper}>
      <div>
     <label htmlFor={name}>{label}</label>
      </div>
      <input
        id={name}
        name={name}
        type={type}
        value={type === "file" ? "" : value} 
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={error ? styles.inputError : ""}
        accept={type === "file" ? ".pdf,.doc,.docx" : undefined}
      />
      {error && <p className={styles.errorMessage}>{error}</p>}
      {type === "file" && value && (
        <p className={styles.fileName}>Selected: {value}</p>
      )}
    </div>
  );
}

export default Input;
