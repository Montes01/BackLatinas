import { HOME_TEXTS } from "../../../lib/constants/homeConstants";
import { NavButton } from "../../atoms/NavButton/navButton"
import styles from './header.module.scss';
export const Header = () => {
    return (
        <header className={styles.header}>
            <header className={styles.header__nav}>
                <NavButton text="Home" path="/home" />
                <NavButton text="Girls" path="/home/girls" />
                <NavButton text="Comments" path="/comments" />
                <NavButton text="Members" path="/members" />
                <NavButton text="Login" path="/login" />
            </header>
            <main className={styles.header__content}>
                <h1 className={styles.header__content__title}> {HOME_TEXTS.TITLE}</h1>
                <p className={styles.header__content__paragraph}>{HOME_TEXTS.PHARAGRAHPS.HEAD}</p>
            </main>
        </header>
    )
}