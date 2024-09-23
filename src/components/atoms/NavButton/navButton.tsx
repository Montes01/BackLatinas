import { Link } from "react-router-dom";
import styles from './navButton.module.css';
interface NavButtonProps {
    text: string;
    path: string;
}

export const NavButton = ({ text, path }: NavButtonProps) => {
    return (
        <Link to={path} className={styles.navButton}>
            <button>{text}</button>
        </Link>
    );
}