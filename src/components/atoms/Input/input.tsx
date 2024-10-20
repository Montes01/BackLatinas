interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}
import styles from './input.module.scss';
export const Input = ({ label, type, onChange, placeholder, required, error, name }: InputProps) => {
    return (
        <div className={styles.inputGroup}>
            <label htmlFor={name}>{label}</label>
            <input
                id={name}
                type={type}
                placeholder={placeholder}
                required={required}
                onChange={onChange}
                className={styles.inputGroup__input}
                name={name}
            />
            {error && <div className={styles.errorMessage}>{error}</div>}
        </div>
    );
}