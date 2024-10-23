import { useParams } from "react-router-dom"
import { GirlPage as Render} from "../components/templates/girl"
import styles from './pages.module.scss';
export default function SingleGirl() {
    const { username } = useParams()
    return (
        <div className={styles.single_girl_page}>
            <Render username={username!} />
        </div>
    )
}