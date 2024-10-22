import { useEffect, useState } from "react";
import { Comment as commentType } from "../../../lib/types/types";
import axios from 'axios';
import { Header } from "../../molecules/Header/header";
import styles from './CommentsClient.module.scss';
import { Footer } from "../../molecules/Footer/footer";
import { Comments } from "../../organisms/Comments/comments";
import { Loader } from "../../atoms/Loader/loader";
import { environment } from "../../../lib/config/environment";


export const CommentsClient = () => {
    const [comments, setComments] = useState<Array<commentType>>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [_, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`${environment.URLS.BACK_URL}/comments`);
                setComments(response.data);
            } catch (err) {
                setError('Error fetching comments');
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, []);

    const viewMore = () => {
        console.log('View More');
    }
    return (
        <>
            <Header />
            <main className={styles.large_section_wrapper}>
                {loading ?
                    <Loader /> :
                    <Comments comments={comments} viewMoreButton={comments.length > 10} customButtonAction={viewMore}/>
                }
                <Footer />
            </main>
        </>
    );
};
