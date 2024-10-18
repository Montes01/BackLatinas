import { Login as Render } from "../components/templates/login";
import styles from './pages.module.scss'
export default function Login() {
    return (
        <div className={styles.login}>
            <Render />
        </div>
    );
}