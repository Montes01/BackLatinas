import { GirlsAdmin } from "../components/templates/girlsAdmin/girlsAdmin";
import styles from "./pages.module.scss";
export default function Admin() {
    return (
        <div className={styles.adminGirls}>
            <GirlsAdmin />
        </div>
    )
}