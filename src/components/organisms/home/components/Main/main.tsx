import { HOME_TEXTS } from "../../../../../lib/constants/homeConstants";
import styles from './main.module.scss';
export const Main = () => {
    return (
        <main className={styles.main}>
            <h1 className={styles.main__title}> {HOME_TEXTS.TITLE}</h1>
            <p className={styles.main__paragraph}>{HOME_TEXTS.PHARAGRAHPS.HEAD}</p>
        </main>
    );
}