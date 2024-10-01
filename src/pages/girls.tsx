import { GirlsPage as Render } from "../components/templates/girls";
import styles from "./pages.module.scss";
export default function GirlsPage() {
    return (
        <div className={styles.girls}>
            <Render />
        </div>
    )
}