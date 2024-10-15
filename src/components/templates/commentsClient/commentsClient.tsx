import { useEffect, useState } from "react";
import { Comment as commentType } from "../../../lib/types/types"; 
import axios from 'axios';
import { Header } from "../../molecules/Header/header";
import styles from './CommentsClient.module.scss';
import { Footer } from "../../molecules/Footer/footer";
import { Comments } from "../../organisms/Comments/comments";


export const CommentsClient = () => {
    const [comments, setComments] = useState<Array<commentType>>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get('https://backlatinassexcam.onrender.com/LatinasSexCam/comments');
                const uniqueComments = Array.from(new Set(response.data.map((comment: commentType) => comment.idComment)))
                    .map(id => response.data.find((comment: commentType) => comment.idComment === id));
                
                setComments(uniqueComments.filter(Boolean)); // Filtrar cualquier valor undefined
            } catch (err) {
                setError('Error fetching comments');
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            <Header />
            <main className={styles.large_section_wrapper}>
                <Comments comments={comments} />
                <Footer />
            </main>
        </>
    );
};
