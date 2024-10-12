import { NavLink } from "react-router-dom";
import styles from './navButton.module.scss';

interface NavButtonProps extends React.HTMLProps<HTMLAnchorElement> {
    text: string;
    path: string;
}

export const NavButton = ({ text, path, ...rest }: NavButtonProps) => {
    return (
        <NavLink
            to={path}
            {...rest}
            className={({ isActive }) =>
                isActive ? `${styles.navButton} ${styles.active}` : styles.navButton
            }
        >
            {text}
        </NavLink>
    );
};
