import { useEffect, useState } from "react";
import { Comment as commentType } from "../../../lib/types/types";
import { Header } from "../../molecules/Header/header";
import styles from './CommentsClient.module.scss';
import { Footer } from "../../molecules/Footer/footer";
import { Comments } from "../../organisms/Comments/comments";
import { Loader } from "../../atoms/Loader/loader";
import { getComments } from "../../../lib/services/api";
import { BackButton } from "../../molecules/BackButton/backButton";
import { maxCommentsPerPage } from "../../../lib/constants/general";
import { Button } from "../../atoms/Button/button";
import { Comment } from "../../atoms/Comment/comment";


export const CommentsClient = () => {
    const [comments, setComments] = useState<Array<commentType>>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [_, setError] = useState<string | null>(null);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [page, setPage] = useState<number>(1);
    const [displayComments, setDisplayComments] = useState<Array<commentType>>([]);
    useEffect(() => {
        if (comments) {
            const roundedUpPages = Math.ceil(comments.length / maxCommentsPerPage);
            setPageNumber(roundedUpPages);
        }
    }, [comments]);

    useEffect(() => {
        setDisplayComments(comments.slice((page - 1) * maxCommentsPerPage, page * maxCommentsPerPage));
    }, [comments, page]);


    useEffect(() => {
        getComments()
            .then((response) => {
                setComments(response);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    const viewMore = () => {
        console.log('View More');
    }
    return (
        <>
            <Header />
            <main className={styles.large_section_wrapper}>
                <BackButton className={styles.large_section_wrapper__back_button} />
                {loading ?
                    <Loader /> :
                    <>
                        <Comments comments={displayComments} customButtonAction={viewMore} />
                        {
                            pageNumber > 1 && displayComments.length < maxCommentsPerPage && (
                                <div className={styles.large_section_wrapper__empty} >
                                    {
                                        Array.from({ length: maxCommentsPerPage - displayComments.length }, (_, i) => (
                                            <Comment
                                                comment={{
                                                    comment: 'x',
                                                    createdAt: 'x',
                                                    idComment: 0,
                                                    stars: 0,
                                                    userName: 'x'
                                                }}
                                                key={`comment-${i}`}
                                                canEdit={false}


                                            />
                                        ))
                                    }
                                </div>
                            )
                        }
                    </>
                }
                <div className={styles.large_section_wrapper__pagination}>
                    <Button className={styles[`large_section_wrapper__pagination__button--active`]} onClick={() => setPage(page => page - 1)} text='<' disabled={page === 1} />
                    {
                        pageNumber > 1 && Array.from({ length: pageNumber }, (_, i) => (
                            <Button
                                key={`pagination-${i}`}
                                className={styles[`large_section_wrapper__pagination__button${page === i + 1 ? '--active' : ''}`]}
                                onClick={() => setPage(i + 1)}
                                text={`${i + 1}`} />
                        ))
                    }
                    <Button className={styles[`large_section_wrapper__pagination__button--active`]} onClick={() => setPage(page => page + 1)} text='>' disabled={page === pageNumber} />
                </div>
                <Footer />
            </main>
        </>
    );
};
