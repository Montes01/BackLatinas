import { ClientProfile as Render } from "../components/templates/clientProfile/clientProfile";
import styles from './pages.module.scss'
export default function Profile() {
    return (
        <div className={styles.profile}>
            <Render />
        </div>
    );
}