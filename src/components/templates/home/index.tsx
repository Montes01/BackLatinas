import { useEffect, useState } from "react";
import { GET_HOME_IMAGES_MOCK as useGetHomeImagesQuery, GET_SERVICES_MOCKS as useGetServicesQuery } from "../../../helpers/mocks";
import { HOME_TEXTS } from "../../../lib/constants/homeConstants";
import { Header } from "../../molecules/Header/header"
import styles from './home.module.scss';
import { CommentRequest, Service } from "../../../lib/types/types";
import { Button } from "../../atoms/Button/button";
import { Comment as commentType } from "../../../lib/types/types";
import { Footer } from "../../molecules/Footer/footer";
import { Comments } from "../../organisms/Comments/comments";
import { environment } from '../../../lib/config/environment'
import { Rating } from "@mui/material";
import { useAppSelector } from "../../../lib/contexts/hooks";
import { AlertModal, AlertModalProps } from "../../molecules/AlertModal/alertModal";
import { useNavigate } from "react-router-dom";
import { postComment } from "../../../lib/services/api";
export const Home = () => {
    const [girlImages, setGirlImages] = useState<Array<string>>([]);
    const [services, setServices] = useState<Array<Service>>([]);
    const [comments, setComments] = useState<Array<commentType>>([]);
    const [commentStars, setCommentStars] = useState<number>(0);
    const navigate = useNavigate();
    const [modalProps, setModalProps] = useState<AlertModalProps>({

        isOpen: false,
        message: 'Are you sure you want to comment?',
        onOk: () => { },
        onCancel: () => { }
    });
    const userInfo = useAppSelector(state => state.auth.user);
    useEffect(() => {
        useGetHomeImagesQuery().then((images) => setGirlImages(images));
        useGetServicesQuery().then((services) => setServices(services));

    }, []);

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
                            setModalProps({ ...modalProps, isOpen: false });
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

    useEffect(() => {
        fetch(environment.URLS.BACK_URL + '/comments', { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setComments(data);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <>
            <Header />
            <main className={styles.large_section_wrapper}>
                <section className={styles.large_section_wrapper__default_section}>
                    {HOME_TEXTS.PHARAGRAHPS.SECOND_SECTION}
                </section>
                <section className={`${styles.large_section_wrapper__default_section} ${styles.large_section_wrapper__third_section}`}>
                    {HOME_TEXTS.PHARAGRAHPS.THIRD_SECTION}
                </section>
                <section className={styles.large_section_wrapper__images}>
                    {
                        girlImages.map((image, index) => (
                            <img key={`Image-${index}`} className={styles.large_section_wrapper__images__image} src={image} alt="home_image" />)
                        )
                    }
                </section>
                <aside className={styles.large_section_wrapper__aditional_info}>
                    <p>{HOME_TEXTS.PHARAGRAHPS.FOURTH_SECTION.FIRST_PARAGRAPH}</p>
                    <p>{HOME_TEXTS.PHARAGRAHPS.FOURTH_SECTION.SECOND_PARAGRAPH}</p>
                    <ol className={styles.large_section_wrapper__aditional_info__points}>
                        {
                            HOME_TEXTS.PHARAGRAHPS.FOURTH_SECTION.POINTS.map((point, index) => (
                                <li key={`Point-${index}`}>{point}</li>
                            ))
                        }
                    </ol>
                    <p>{HOME_TEXTS.PHARAGRAHPS.FOURTH_SECTION.THIRD_PARAGRAPH}</p>
                    <p>{HOME_TEXTS.PHARAGRAHPS.FOURTH_SECTION.FOURTH_PARAGRAPH}</p>
                </aside>
                <section className={styles.large_section_wrapper__services}>
                    <h2>Services</h2>
                    <p>{HOME_TEXTS.PHARAGRAHPS.FIFTH_SECTION}</p>
                    <ul className={styles.large_section_wrapper__services__list}>
                        {
                            services.map((service, index) => (
                                <li key={`Service-${index}`}>
                                    <Button text={service.title} type="button" disabled={false} />
                                </li>
                            ))
                        }
                    </ul>
                </section>
                <Comments comments={comments} viewMoreButton />
                <section className={styles.large_section_wrapper__comment}>
                    <h2 className={styles.large_section_wrapper__comment__title}>Leave a comment</h2>
                    <form onSubmit={handleComment} className={styles.large_section_wrapper__comment__form}>
                        <textarea name="comment" />
                        <Rating name="simple-controlled" value={commentStars} onChange={handleStarsChange} />
                        <Button text="Send" type="submit" disabled={false} className={styles.large_section_wrapper__comment__form__button} />
                    </form>
                </section>
                <Footer />
            </main>
            <AlertModal {...modalProps} />
        </>
    )
}