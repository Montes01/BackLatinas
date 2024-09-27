import { Link } from "react-router-dom";
import styles from './navButton.module.scss';
interface NavButtonProps {
    text: string;
    path: string;
}

export const NavButton = ({ text, path }: NavButtonProps) => {
    return (
        <Link to={path} >
            <button className={styles.navButton}>{text}</button>
        </Link>
    );
}