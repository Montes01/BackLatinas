import { useEffect } from "react";
import styles from './button.module.scss';
interface ButtonProps extends React.HTMLProps<HTMLButtonElement>{
    text: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    url?: string;
}
export const Button = ({ text, onClick, type = 'button', disabled = false, url, ...rest }: ButtonProps) => {
    const handleUncoherentProps = () => {
        if (url && type !== 'button') {
            throw('You can only pass a url prop to a button with type button');
        }
    }
    useEffect(() => {
        handleUncoherentProps();
    }, [url, type]);
    return url ? (
        <button {...rest} className={`${styles.button} ${rest.className}`} type={type} onClick={onClick} disabled={disabled}>{text}</button>
    ) : (
        <a className={`${styles.button} ${rest.className}`} href={url} onClick={onClick} >
            {text}
        </a>
    )
}