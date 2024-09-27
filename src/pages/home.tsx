import { Home } from "../components/organisms/home";
import styles from './pages.module.scss';
export default function HomePage () {
  return (
    <div className={styles.home}>
      <Home />
    </div>
  );
};