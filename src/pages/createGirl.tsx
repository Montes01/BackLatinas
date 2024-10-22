import { CreateGirl as Render } from "../components/templates/createGirl/createGirl";
import styles from './pages.module.scss'

export default function CreateGirl() {
    return (
        <div className={styles.createGirl}>
            <Render />
        </div>
    )
}