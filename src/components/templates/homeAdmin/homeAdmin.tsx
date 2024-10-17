import { useEffect, useState } from "react";
import { GET_HOME_IMAGES_MOCK as useGetHomeImagesQuery, GET_SERVICES_MOCKS as useGetServicesQuery, GET_COMMENTS_MOCK as useGetCommentsQuery } from "../../../helpers/mocks";
import { HOME_TEXTS } from "../../../lib/constants/homeConstants";
import { Header } from "../../molecules/Header/header"
import styles from './homeAdmin.module.scss';
import { Service } from "../../../lib/types/types";
import { Button } from "../../atoms/Button/button";
import { Comment as commentType } from "../../../lib/types/types";
import { Footer } from "../../molecules/Footer/footer";
import { Comments } from "../../organisms/Comments/comments";
export const HomeAdmin = () => {
    const [girlImages, setGirlImages] = useState<Array<string>>([]);
    const [services, setServices] = useState<Array<Service>>([]);
    const [comments, setComments] = useState<Array<commentType>>([]);
    useEffect(() => {
        useGetHomeImagesQuery().then((images) => setGirlImages(images));
        useGetServicesQuery().then((services) => setServices(services));
        useGetCommentsQuery().then((comments) => setComments(comments));
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
                <Comments comments={comments} />            
                <Footer />
            </main>

        </>
    )
}


export default HomeAdmin;