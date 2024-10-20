import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { HOME_TEXTS } from "../../../lib/constants/homeConstants";
import { IconMenu } from "../../atoms/MenuIcon/menuIcon";
import styles from './header.module.scss';
import ReactFlagsSelect from "react-flags-select";
import { Hamburguer } from "../Hamburguer/hamburguer";
import i18n from "../../../i18n/i18n";
import { t } from "i18next";

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
                    <Hamburguer isMenuOpen={isMenuOpen} menuRef={menuRef} />
                </div>
            </header>
            <main className={styles.header__content}>
                <h1 className={styles.header__content__title}>{t(HOME_TEXTS.TITLE)}</h1>
                <p className={styles.header__content__paragraph}>{t(HOME_TEXTS.PHARAGRAHPS.HEAD)}</p>
            </main>
        </header>
    );
};
