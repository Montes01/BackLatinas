import { Button } from "../../atoms/Button/button"
import { Rating } from "@mui/material";
import styles from './comment.module.scss';
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../lib/contexts/hooks";
import { AlertModal, AlertModalProps } from "../AlertModal/alertModal";
import { postComment } from "../../../lib/services/api";
import { CommentRequest } from "../../../lib/types/types";

interface CommentBoxProps {
    onComment: () => void;
}

export const CommentBox = ({ onComment }: CommentBoxProps) => {
    const navigate = useNavigate();
    const userInfo = useAppSelector(state => state.auth.user);

    const areaRef = useRef<HTMLTextAreaElement>(null);
    const [commentStars, setCommentStars] = useState<number>(0);
    const [modalProps, setModalProps] = useState<AlertModalProps>({

        isOpen: false,
        message: 'Are you sure you want to comment?',
        onOk: () => { },
        onCancel: () => { }
    });
    const handleStarsChange = (_: React.ChangeEvent<{}>, value: number | null) => {
        setCommentStars(value ?? 0);
    }
    const handleComment = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!userInfo) {
            navigate('/login');
        }
        const formData = new FormData(event.currentTarget);
        const comment = formData.get('comment') as string;

        setModalProps({
            isOpen: true,
            message: 'Are you sure you want to comment?',
            onCancel: () => setModalProps({ ...modalProps, isOpen: false }),
            onOk: async () => {
                setModalProps({
                    isLoading: true,
                    message: 'Posting',
                    isOpen: true,
                    onOk: () => {
                        setModalProps({ ...modalProps, isOpen: false });
                    },
                    onCancel: () => { }
                });
                const body: CommentRequest = {
                    comment,
                    email: userInfo!.sub,
                    stars: commentStars,
                }
                try {
                    await postComment(body);
                    setModalProps({
                        message: 'Comment posted',
                        isLoading: false,
                        isOpen: true,
                        onOk: () => {
                            onComment();
                            setModalProps({ ...modalProps, isOpen: false });
                            setCommentStars(0);
                            areaRef.current!.value = '';
                        },
                        onCancel: undefined
                    });
                } catch (error) {
                    setModalProps({
                        message: 'Error posting comment',
                        isLoading: false,
                        isOpen: true,
                        onOk: () => {
                            setModalProps({ ...modalProps, isOpen: false });
                        },
                        onCancel: undefined
                    });
                }
            }
        });
    }
    return userInfo?.rol !== 'admin' && (
        <>
            <section className={styles.comment}>
                <h2 className={styles.comment__title}>Leave a comment</h2>
                <form onSubmit={handleComment} className={styles.comment__form}>
                    <textarea ref={areaRef} name="comment" />
                    <Rating name="simple-controlled" value={commentStars} onChange={handleStarsChange} />
                    <Button text="Send" type="submit" disabled={false} className={styles.comment__form__button} />
                </form>
            </section>

            <AlertModal {...modalProps} />
        </>
    )
}