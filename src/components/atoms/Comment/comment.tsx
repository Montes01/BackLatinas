import { useRef, useState } from "react";
import { CommentRequest, Comment as type } from "../../../lib/types/types"
import { StarRate } from "../StarRate/StarRate";
import { UserIcon } from "../UserIcon/userIcon";
import styles from './comment.module.scss';
import { Delete, Edit, Save } from "@mui/icons-material";
import { AlertModal, AlertModalProps } from "../../molecules/AlertModal/alertModal";
import { deleteComment, editComment } from "../../../lib/services/api";
import { useAppSelector } from "../../../lib/contexts/hooks";
export const Comment = ({ comment, canEdit, reload }: { comment: type, canEdit?: boolean, reload?: () => void}) => {
  const [imageError] = useState<boolean>(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const user = useAppSelector(state => state.auth.user);
  const [modalProps, setModalProps] = useState({
    isOpen: false,
    isLoading: false,
    message: '',
    onOk: () => { },
    onCancel: () => { },
  } as AlertModalProps);

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = '/assets/default-girl.png'
  }
  const handleEdit = () => {
    setEditMode(e => !e);
    if (editMode) {
      handleEditComment(comment.idComment, {
        comment: inputRef.current!.value,
        email: user!.sub,
        stars: comment.stars,
      });
    }
  }

  // Editar comentario
  const handleEditComment = async (id: number, comment: CommentRequest) => {
    try {
      await editComment(id, comment);
      setModalProps({
        ...modalProps,
        message: 'Coment edited succesfully.',
        isOpen: true,
        onCancel: undefined,
        onOk: () => { 
          setModalProps({ ...modalProps, isOpen: false })
          reload?.();
        }
      });
    } catch (error) {
      console.error("Error al editar el comentario:", error);
    }
  };

  // Borrar comentario
  const handleDeleteComment = () => {

    setModalProps({
      isOpen: true,
      message: '¿Estás seguro de que deseas eliminar este comentario?',
      onOk: async () => {
        //initial modal state
        setModalProps({
          ...modalProps, isLoading: true,
          isOpen: true,
        });


        try {
          //delete comment
          await deleteComment(comment.idComment, {
            comment: comment.comment,
            email: user!.sub,
            Stars: comment.stars,
          });

          setModalProps({
            ...modalProps,
            message: 'Comentario eliminado con éxito.',
            isOpen: true,
            onCancel: undefined,
            isLoading: false,
            onOk: () => { 
              reload?.();
              setModalProps({ ...modalProps, isOpen: false })
             }
          });

        } catch (error) {

          console.error("Error al eliminar el comentario:", error);
          setModalProps({
            ...modalProps,
            message: 'Error al eliminar el comentario.',
            isOpen: true,
            onCancel: undefined,
            onOk: () => { setModalProps({ ...modalProps, isOpen: false }) }
          });

        }
      },
      onCancel: () => setModalProps({ ...modalProps, isOpen: false }),
    });

    // try {
    //   await axios.delete(
    //     `https://backlatinassexcam.onrender.com/LatinasSexCam/deleteComment/2${id}`
    //   );
    //   console.log(`Comentario ${id} eliminado con éxito`);
    // } catch (error) {
    //   console.error("Error al eliminar el comentario:", error);
    // }
  };
  return (
    <>
      <article className={styles.comment_wrapper}>
        <div className={styles.comment_wrapper__avatar}>
          {
            imageError ?
              <UserIcon className={styles.comment_wrapper__avatar__image} />
              : <img onError={handleImageError} src={comment.userName} alt="avatar" className={styles.comment_wrapper__avatar__image} />
          }
        </div>
        <section className={styles.comment_wrapper__text}>
          <h3 className={styles.comment_wrapper__text__name}>{comment.userName}</h3>
          {
            editMode ?
              <input ref={inputRef} className={styles['comment_wrapper__text__comment--edit']} defaultValue={comment.comment} /> :
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
                {
                  editMode ?
                    <Save className={styles.comment_wrapper__actions__edit__icon} /> :
                    <Edit className={styles.comment_wrapper__actions__edit__icon} />}
              </button>
              <button className={styles.comment_wrapper__actions__delete}>
                <Delete className={styles.comment_wrapper__actions__delete__icon} onClick={handleDeleteComment} />
              </button>
            </div>
          )
        }
      </article>
      <AlertModal {...modalProps} />
    </>
  )
}