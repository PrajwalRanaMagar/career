import styles from "./input.module.css";

type Props = {
  label: string;
  name: string;
  value: string;
  onChange:  (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
};

function Input(props: Props) {
  const {
    label,
    name,
    value,
    onChange,
    type = "text",
    placeholder,
    required,
    error,
  } = props;

  return (
    <div className={styles.inputWrapper}>
      <div>
        <label>{label}</label>
        {required && <span className={styles.required}> *</span>}
      </div>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={error ? styles.inputError : ""}
      />
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
}

export default Input;
