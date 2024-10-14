import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { HOME_TEXTS } from "../../../lib/constants/homeConstants";
import { IconMenu } from "../../atoms/MenuIcon/menuIcon";
import { NavButton } from "../../atoms/NavButton/navButton";
import styles from './header.module.scss';
import ReactFlagsSelect from "react-flags-select";
import { useTranslation } from "react-i18next";

export const Header = () => {
    const { t, i18n } = useTranslation();
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

    const handleLanguageChange = (countryCode: string) => {
        const languageMap: { [key: string]: string } = {
            US: 'en',
            GB: 'en',
            FR: 'fr',
            DE: 'de',
            IT: 'it',
            ES: 'es'
        };

        const selectedLanguage = languageMap[countryCode];
        if (selectedLanguage) {
            i18n.changeLanguage(selectedLanguage);
            setSelectedCountry(countryCode);
        }
    };

    return (
        <header className={styles.header}>
            <header className={styles.header__nav}>
                <div className={styles.header__nav__menu}>
                    <ReactFlagsSelect
                        showSelectedLabel={false}
                        showOptionLabel={false}
                        className={styles.header__nav__menu__language}
                        selected={selectedCountry}
                        onSelect={handleLanguageChange}
                        countries={["US", "GB", "FR", "DE", "IT", "ES"]}
                    />
                    <div ref={navRef} className={styles.header__nav__menu__icon}>
                        <IconMenu onClick={handleMenuClick} />
                    </div>
                    <div ref={menuRef} className={styles[`header__nav__menu__items${isMenuOpen ? '' : '--closed'}`]}>
                        <NavButton
                            text={t('sign_in')}
                            path="/loginAdmin"
                            className={styles.header__nav__menu__items__main}
                        />
                        <NavButton
                            text={t('sign_up')}
                            path="/createClient"
                            className={styles.header__nav__menu__items__main}
                        />
                        <hr />
                        <NavButton text={t('home')} path="/home" />
                        <NavButton text={t('girls')} path="/home/girls" />
                        <NavButton text={t('comments')} path="/comments" />
                        <NavButton text={t('join_our_team')} path="/join" />
                    </div>
                </div>
            </header>
            <main className={styles.header__content}>
                <h1 className={styles.header__content__title}>{t(HOME_TEXTS.TITLE)}</h1>
                <p className={styles.header__content__paragraph}>{t(HOME_TEXTS.PHARAGRAHPS.HEAD)}</p>
            </main>
        </header>
    );
};
