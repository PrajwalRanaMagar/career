import styles from "./textArea.module.css";

type Props = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
   placeholder?: string;
   error?: string;
};

function TextArea(props: Props) {
  const { label, name, value, onChange, placeholder, required, error, } = props;

  return (
    <div className={styles.textAreaWrapper}>
      <div>
      <label>{label}</label>
      {required && <span className={styles.required}> *</span>}
      </div>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
         placeholder={placeholder}
        required={required}
        className={error ? styles.textAreaError : ""}
      />
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
}

export default TextArea;
