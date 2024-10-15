import { Comment } from "../../atoms/Comment/comment";
import { Comment as CommentType } from "../../../lib/types/types";
import { useNavigate } from "react-router-dom"; // Import useNavigate
interface Props {
  comments: CommentType[];
}
import styles from "./comments.module.scss";
import { Button } from "../../atoms/Button/button";
import { ROUTES } from "../../../lib/constants/routes";
import { Arrow } from "../../atoms/Arrow/arrow"; // Import Arrow component
export const Comments = ({ comments }: Props) => {
  const navigate = useNavigate();

  return (
    <section className={styles.comments}>
      <h2 className={styles.comments__title}>Comments</h2>
      <div className={styles.girlBase__backContainer}>
        <Arrow className={styles.girlBase__backContainer__arrow} />
        <Button
          text="Back"
          className={styles.girlBase__backContainer__back}
          onClick={() => navigate(-1)}
        />{" "}
      </div>
      <ul className={styles.comments__list}>
        {comments.map((comment, index) => (
          <Comment key={`Comment-${index}`} comment={comment} />
        ))}
      </ul>
      <Button
        text="View More"
        type="button"
        disabled={false}
        url={ROUTES.HOME.HOME}
        className={styles.comments__button}
      />
    </section>
  );
};
