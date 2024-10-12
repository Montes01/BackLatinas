import { HOME_TEXTS } from "../../../lib/constants/homeConstants";
import { NavButton } from "../../atoms/NavButton/navButton";
import { useState } from "react";
import { FaFlag } from 'react-icons/fa';
import styles from './header.module.scss';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

export const Header = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('en');
    const [isLanguageDropdownOpen, setLanguageDropdownOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    const handleLanguageChange = (lang: string) => {
        setSelectedLanguage(lang);
        setLanguageDropdownOpen(false);
    };

    return (
        <header className={styles.header}>
            <div className={styles.header__nav}>
                <div className={styles.header__nav__toggle} onClick={toggleMenu}>
                    {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
                </div>
                <nav className={`${styles.header__nav__links} ${isMenuOpen ? styles.open : ''}`}>
                    <NavButton text="Sing in" path="/loginClient" />
                    <NavButton text="Log in" path="/loginClient" />
                    <NavButton text="Home" path="/home" />
                    <NavButton text="Girls" path="/home/girls" />
                    <NavButton text="Comments" path="/comments" />
                    <NavButton text="Members" path="/members" />
                </nav>
                <div className={styles.languageSelector}>
                    <span onClick={() => setLanguageDropdownOpen(!isLanguageDropdownOpen)}>
                        <FaFlag /> {selectedLanguage.toUpperCase()}
                    </span>
                    {isLanguageDropdownOpen && (
                        <div className={styles.languageDropdown}>
                            <span onClick={() => handleLanguageChange('en')}>English</span>
                            <span onClick={() => handleLanguageChange('es')}>Español</span>
                        </div>
                    )}
                </div>
            </div>
            <main className={styles.header__content}>
                <h1 className={styles.header__content__title}>{HOME_TEXTS.TITLE}</h1>
                <p className={styles.header__content__paragraph}>{HOME_TEXTS.PHARAGRAHPS.HEAD}</p>
            </main>
        </header>
    );
};
