interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    reference?: React.RefObject<HTMLInputElement>;
    maxLength?: number;
}
import styles from './input.module.scss';
export const Input = ({ label, type, onChange, placeholder, required, error, name, reference, maxLength, ...rest }: InputProps) => {

    return (
        <div className={`${styles.inputGroup} ${rest.className}`} >
            {label && <label htmlFor={name}>{label}</label>}
            <input
                {...rest}
                id={name}
                type={type}
                placeholder={placeholder}
                required={required}
                onChange={onChange}
                className={styles.inputGroup__input}
                name={name}
                ref={reference}
                maxLength={maxLength}
            />
            {error && <div className={styles.errorMessage}>{error}</div>}
        </div>
    );
}