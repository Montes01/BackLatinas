import { useState } from "react";
import { Comment as type } from "../../../lib/types/types"
import { StarRate } from "../StarRate/StarRate";
import { UserIcon } from "../UserIcon/userIcon";
import styles from './comment.module.scss';
import { Delete, Edit } from "@mui/icons-material";
import axios from "axios";
export const Comment = ({ comment, canEdit }: { comment: type, canEdit?: boolean }) => {
  const [imageError, setImageError] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  const handleImageError = () => {
    setImageError(true);
  }
  const handleEdit = () => {
    setEditMode(e => !e);
    if (editMode) {
      handleEditComment(comment.idComment, comment.comment);
    }
  }

  // Editar comentario
  const handleEditComment = async (id: number, updatedText: string) => {
    try {
      await axios.put(
        `https://backlatinassexcam.onrender.com/LatinasSexCam/editComment/${id}`,
        {
          text: updatedText,
        }
      );
      console.log(`Comentario ${id} editado con éxito`);
    } catch (error) {
      console.error("Error al editar el comentario:", error);
    }
  };

  // Borrar comentario
  const handleDeleteComment = async (id: number) => {
    try {
      await axios.delete(
        `https://backlatinassexcam.onrender.com/LatinasSexCam/deleteComment/2${id}`
      );
      console.log(`Comentario ${id} eliminado con éxito`);
    } catch (error) {
      console.error("Error al eliminar el comentario:", error);
    }
  };
  return (
    <article className={styles.comment_wrapper}>
      <div className={styles.comment_wrapper__avatar}>
        {
          imageError ?
            <UserIcon className={styles.comment_wrapper__avatar__image} />
            : <img onError={handleImageError} src={comment.user?.profile_photo} alt="avatar" className={styles.comment_wrapper__avatar__image} />
        }
      </div>
      <section className={styles.comment_wrapper__text}>
        <h3 className={styles.comment_wrapper__text__name}>{comment.userName}</h3>
        {
          editMode ?
            <textarea className={styles['comment_wrapper__text__comment--edit']} defaultValue={comment.comment} /> :
            <p className={styles.comment_wrapper__text__comment}>{comment.comment}</p>}
        <small>{comment.createdAt}</small>
      </section>
      <div className={styles.comment_wrapper__rate}>
        {
          new Array(comment.stars).fill(undefined).map((_, index) => (
            <StarRate key={`Star-${index}`} />
          ))
        }
      </div>
      {
        canEdit && (
          <div className={styles.comment_wrapper__actions}>
            <button className={styles.comment_wrapper__actions__edit} onClick={handleEdit}>
              <Edit className={styles.comment_wrapper__actions__edit__icon} />
            </button>
            <button className={styles.comment_wrapper__actions__delete}>
              <Delete className={styles.comment_wrapper__actions__delete__icon} />
            </button>
          </div>
        )
      }
    </article>
  )
}