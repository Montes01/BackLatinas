import { useTranslation } from "react-i18next";
import { NavButton } from "../../atoms/NavButton/navButton";
import { useAppSelector } from "../../../lib/contexts/hooks";
import { useAppDispatch } from "../../../lib/contexts/hooks";
import styles from './hamburguer.module.scss';
import { Button } from "../../atoms/Button/button";
import { setUser } from "../../../lib/contexts/auth/authSlice";
import { adminMenu, girlMenu, loggedMenu, MenuItem, tokenName, unloggedMenu } from "../../../lib/constants/general";
import { useEffect, useState } from "react";
interface Props {
    isMenuOpen: boolean;
    menuRef: React.RefObject<HTMLDivElement>;
}
export const Hamburguer = ({ isMenuOpen, menuRef }: Props) => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const userInfo = useAppSelector(state => state.auth.user);
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

    const handleLogout = () => {
        localStorage.removeItem(tokenName);
        window.location.href = '/';
        dispatch(setUser(null));
    }

    useEffect(() => {

        if (!userInfo) {
            setMenuItems(unloggedMenu)
            return;
        }
        console.log(userInfo)
        switch (userInfo?.rol) {
            case 'admin':
                setMenuItems(adminMenu)
                break;
            case 'girl':
                setMenuItems(girlMenu)
                break;
            default:
                setMenuItems(loggedMenu)
                break;
        }
    }, [userInfo]);





    return (
        <div ref={menuRef} className={styles[`items${isMenuOpen ? '' : '--closed'}`]}>
            {!userInfo?.rol ? <NavButton
                text={t('sign_in')}
                path="/login"
                className={styles.items__main}
            /> : <Button text={t('log-out')} onClick={handleLogout} className={styles.items__main} />
            }
            <NavButton
                text={userInfo?.rol ? t('profile') : t('sign_up')}
                path={userInfo?.rol ? '/clientProfile' : "/createClient"}
                className={styles.items__main}
            />
            <hr />
            {menuItems.map((item, index) => (
                <NavButton
                    key={`menu-item-${index}`}
                    text={t(item.text)}
                    path={item.path}
                    className={styles.items__main}
                />
            ))}
        </div>
    )
}