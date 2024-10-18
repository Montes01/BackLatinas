import { useNavigate } from "react-router-dom";
import { Arrow } from "../../atoms/Arrow/arrow";
import { Button } from "../../atoms/Button/button";
import styles from "./backButton.module.scss";
export const BackButton = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.backContainer} onClick={() => navigate(-1)}>
            <Arrow className={styles.backContainer__arrow} />
            <Button
                text="Back"
                className={styles.backContainer__back}
            />
        </div>
    );
}
