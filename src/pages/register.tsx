import styles from './pages.module.scss';
import CreateClient from '../components/templates/createClient';
import CreateGirls from '../components/templates/createGirls';

export default function Register({ role }: { role: 'client' | 'girl' }) {
    const Render = role === 'client' ? CreateClient : CreateGirls;
    return (
        <div className={styles.register}>
            <Render />
        </div>
    )
}