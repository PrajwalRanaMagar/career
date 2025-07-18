import styles from "./textArea.module.css";

type Props = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
   placeholder?: string;
   error?: string;
   disabled?: boolean; 
};

function TextArea(props: Props) {
  const { label, name, value, onChange, placeholder, required, error, disabled,} = props;

  return (
    <div className={styles.textAreaWrapper}>
      <div>
      <label>{label}</label>
      </div>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
         placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={error ? styles.textAreaError : ""}
      />
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
}

export default TextArea;
