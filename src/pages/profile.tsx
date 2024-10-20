import { ClientProfile as Render } from "../components/templates/clientProfile/clientProfile";
import { tokenName } from "../lib/constants/general";
import styles from './pages.module.scss'
import { useNavigate } from "react-router-dom";
export default function Profile() {
    const navigate = useNavigate();
    if (!localStorage.getItem(tokenName)) {
        navigate('/login');
    }
    return (
        <div className={styles.profile}>
            <Render />
        </div>
    );
}