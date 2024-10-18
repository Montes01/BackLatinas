interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    options: { label: string; value: string }[];
}

import styles from './select.module.scss';

export const Select = ({ label, options, value, onChange, name }: SelectProps) => {
    return (
        <div className={styles.selectGroup}>
            <label htmlFor={name}>{label}</label>
            <select
                id={name}
                required
                value={value}
                onChange={onChange}
                className={styles.selectGroup__input}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}