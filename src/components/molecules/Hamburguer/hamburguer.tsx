import { useTranslation } from "react-i18next";
import { NavButton } from "../../atoms/NavButton/navButton";
import { useAppSelector } from "../../../lib/contexts/hooks";
import { useAppDispatch } from "../../../lib/contexts/hooks";
import styles from './hamburguer.module.scss';
import { Button } from "../../atoms/Button/button";
import { setUser } from "../../../lib/contexts/auth/authSlice";
import { tokenName } from "../../../lib/constants/general";
interface Props {
    isMenuOpen: boolean;
    menuRef: React.RefObject<HTMLDivElement>;
}
export const Hamburguer = ({ isMenuOpen, menuRef }: Props) => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const userInfo = useAppSelector(state => state.auth.user);


    const handleLogout = () => {
        localStorage.removeItem(tokenName);
        window.location.href = '/';
        dispatch(setUser(null));
    }
    return (
        <div ref={menuRef} className={styles[`items${isMenuOpen ? '' : '--closed'}`]}>
            {!userInfo?.rol?.name ? <NavButton
                text={t('sign_in')}
                path="/login"
                className={styles.items__main}
            /> : <Button text={t('log-out')} onClick={handleLogout} className={styles.items__main} />
            }
            <NavButton
                text={userInfo?.rol?.name ? t('profile') : t('sign_up')}
                path={userInfo?.rol?.name ? '/clientProfile' : "/createClient"}
                className={styles.items__main}
            />
            <hr />
            <NavButton text={t('home')} path="/home" />
            <NavButton text={t('girls')} path="/home/girls" />
            <NavButton text={t('comments')} path="/comments" />
            <NavButton text={t('join_our_team')} path="/join" />
        </div>
    )
}