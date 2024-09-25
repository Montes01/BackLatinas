import { NavButton } from "../../atoms/NavButton/navButton"
import styles from './header.module.css';
export const Header = () => {
    return (
        <header className={styles.header}>
            <NavButton text="Home" path="/home" />
            <NavButton text="Girls" path="/girls" />
            <NavButton text="Comments" path="/comments" />
            <NavButton text="Members" path="/members" />
            <NavButton text="Login" path="/login" />
        </header>
    )
}