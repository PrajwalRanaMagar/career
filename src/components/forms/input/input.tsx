import styles from "./input.module.css";

type Props = {
  label: string;
  name: string;
  value: string;
  onChange: (e: any) => void;
  type?: string;
  required?: boolean;
  pattern?: string;
};

function Input(props: Props) {
  const {
    label,
    name,
    value,
    onChange,
    type = "text",
    required = true,
    pattern,
  } = props;

  return (
    <div className={styles.inputWrapper}>
      <div>
        <label>{label}</label>
        {required && <span className={styles.required}> *</span>}
      </div>
      <input
        className={styles.inputField}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        pattern={pattern}
        title={name === "phone" ? "Enter a 10-digit phone number" : ""}
      />
    </div>
  );
}

export default Input;
