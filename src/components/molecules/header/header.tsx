import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { HOME_TEXTS } from "../../../lib/constants/homeConstants";
import { IconMenu } from "../../atoms/MenuIcon/menuIcon";
import { NavButton } from "../../atoms/NavButton/navButton"
import styles from './header.module.scss';
import ReactFlagsSelect from "react-flags-select";
export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState('US');
    const navRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const handleMenuClick: MouseEventHandler = () => {
        setIsMenuOpen(!isMenuOpen);
    }
    const handleClickOutside = (event: MouseEvent) => {
        if (navRef.current && !navRef.current.contains(event.target as Node) && menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setIsMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    return (
        <header className={styles.header}>
            <header className={styles.header__nav}>
                <div className={styles.header__nav__menu}>
                    <ReactFlagsSelect
                        showSelectedLabel={false}
                        showOptionLabel={false}
                        className={styles.header__nav__menu__language}
                        selected={selectedCountry}
                        onSelect={(el) => setSelectedCountry(el)} countries={["US", "GB", "FR", "DE", "IT", "ES"]}
                    />
                    <div ref={navRef} className={styles.header__nav__menu__icon}>
                        <IconMenu onClick={handleMenuClick} />
                    </div>
                    <div ref={menuRef} className={styles[`header__nav__menu__items${isMenuOpen ? '' : '--closed'}`]}>
                        <NavButton text="Sign in" path="/sign-in" className={styles.header__nav__menu__items__main} />
                        <NavButton text="Sign up" path="/sign-up" className={styles.header__nav__menu__items__main} />
                        <hr />
                        <NavButton text="Home" path="/home" />
                        <NavButton text="Girls" path="/home/girls" />
                        <NavButton text="Comments" path="/comments" />
                        <NavButton text="Join our team" path="/join" />
                    </div>
                </div>

            </header>
            <main className={styles.header__content}>
                <h1 className={styles.header__content__title}>{HOME_TEXTS.TITLE}</h1>
                <p className={styles.header__content__paragraph}>{HOME_TEXTS.PHARAGRAHPS.HEAD}</p>
            </main>
        </header>
    );
};
