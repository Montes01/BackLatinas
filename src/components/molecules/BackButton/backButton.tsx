import { useNavigate } from "react-router-dom";
import { Arrow } from "../../atoms/Arrow/arrow";
import { Button } from "../../atoms/Button/button";
import styles from "./backButton.module.scss";
interface Props extends React.HTMLAttributes<HTMLDivElement> { }
export const BackButton = (props: Props) => {
    const navigate = useNavigate();

    return (
        <div {...props} className={`${styles.backContainer} ${props.className}`} onClick={() => navigate(-1)}>
            <Arrow className={styles.backContainer__arrow} />
            <Button
                text="Back"
                className={styles.backContainer__back}
            />
        </div>
    );
}
