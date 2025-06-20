import styles from "./textArea.module.css";

type Props = {
  label: string;
  name: string;
  value: string;
  onChange: (e: any) => void;
  required?: boolean;
};

function TextArea(props: Props) {
  const { label, name, value, onChange, required = true } = props;

  return (
    <div className={styles.textAreaWrapper}>
      <div>
      <label>{label}</label>
      {required && <span className={styles.required}> *</span>}
      </div>
      <textarea
        className={styles.textAreaField}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}

export default TextArea;
