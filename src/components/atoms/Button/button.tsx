import { useEffect } from "react";
import styles from './button.module.scss';
interface ButtonProps {
    text: string;
    onClick?: () => void;
    type: "button" | "submit" | "reset";
    disabled: boolean;
    url?: string;
}
export const Button = ({ text, onClick, type = 'button', disabled, url }: ButtonProps) => {
    const handleUncoherentProps = () => {
        if (url && type !== 'button') {
            throw('You can only pass a url prop to a button with type button');
        }
    }
    useEffect(() => {
        handleUncoherentProps();
    }, [url, type]);
    return url ? (
        <button className={styles.button} type={type} onClick={onClick} disabled={disabled}>{text}</button>
    ) : (
        <a className={styles.button} href={url} onClick={onClick}>
            {text}
        </a>
    )
}