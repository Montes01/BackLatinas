import { useMemo, useState } from "react";
import { Comment as type } from "../../../lib/types/types"
import { StarRate } from "../StarRate/StarRate";
import { UserIcon } from "../UserIcon/userIcon";
import styles from './comment.module.scss';
export const Comment = ({ comment }: { comment: type }) => {
    const [imageError, setImageError] = useState<boolean>(false);
    const handleImageError = useMemo(() => () => setImageError(true), []);
    return (
        <article className={styles.comment_wrapper}>
            <div className={styles.comment_wrapper__avatar}>
                {
                    imageError ?
                        <UserIcon className={styles.comment_wrapper__avatar__image} />
                        : <img onError={handleImageError} src={comment.avatar} alt="avatar" className={styles.comment_wrapper__avatar__image} />
                }
            </div>
            <section className={styles.comment_wrapper__text}>
                <h3 className={styles.comment_wrapper__text__name}>{comment.username}</h3>
                <p className={styles.comment_wrapper__text__comment}>{comment.text}</p>
            </section>
            <div className={styles.comment_wrapper__rate}>
                {
                    new Array(comment.rate).fill(undefined).map((_, index) => (
                        <StarRate key={`Star-${index}`} />
                    ))
                }
            </div>
        </article>
    )
}