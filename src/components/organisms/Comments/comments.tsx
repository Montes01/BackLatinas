import { Comment } from '../../atoms/Comment/comment';
import { Comment as CommentType } from '../../../lib/types/types';
interface Props {
    comments: CommentType[]
}
import styles from './comments.module.scss';
import { Button } from '../../atoms/Button/button';
export const Comments = ({ comments }: Props) => {
    return (
        <section className={styles.comments}>
            <h2 className={styles.comments__title}>Comments</h2>
            <ul className={styles.comments__list}>
                {
                    comments.map((comment, index) => (
                        <Comment key={`Comment-${index}`} comment={comment} />
                    ))
                }
            </ul>
            <Button text='View More' type='button' disabled={false} url='/comments' className={styles.comments__button} />
        </section>
    )
}