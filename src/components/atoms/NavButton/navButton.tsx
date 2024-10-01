import { Link } from "react-router-dom";
import styles from './navButton.module.scss';
interface NavButtonProps extends React.HTMLProps<HTMLAnchorElement> {
    text: string;
    path: string;
}

export const NavButton = ({ text, path, ...rest }: NavButtonProps) => {
    return (
        <Link to={path} {...rest} >
            <span className={styles.navButton}>{text}</span>
        </Link>
    );
}