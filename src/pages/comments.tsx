import styles from './pages.module.scss';
import { CommentsClient as Render } from '../components/templates/commentsClient/commentsClient';
export default function Comments() {
    return (
        <div className={styles.comments}>
            <Render />
        </div>
    );
}