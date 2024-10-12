import { useEffect, useState } from "react";
import { Category, Service, Comment as CommentType, Women } from "../../../lib/types/types";
import { Header } from "../../molecules/Header/header"
import styles from './girls.module.scss';
import { GET_CATEGORIES_MOCK as useGetCategoriesQuery, GET_SERVICES_MOCKS as useGetServicesQuery, GET_COMMENTS_MOCK as useGetCommentsQuery, GET_GIRLS_MOCK as useGetGirlsQuery } from "../../../helpers/mocks";
import { Button } from "../../atoms/Button/button";
import { NavButton } from "../../atoms/NavButton/navButton";
import { Comments } from "../../organisms/Comments/comments";
import { Footer } from "../../molecules/Footer/footer";
import { HOME_TEXTS } from "../../../lib/constants/homeConstants";
import { GirlList } from "../../organisms/GirlList/girlList";
export const GirlsPage = () => {

    const [services, setServices] = useState<Array<Service>>([]);
    const [categories, setCategories] = useState<Array<Category>>([]);
    const [comments, setComments] = useState<Array<CommentType>>([]);
    const [girls, setGirls] = useState<Array<Women>>([]);
    useEffect(() => {
        useGetServicesQuery().then((services) => setServices(services));
        useGetCategoriesQuery().then((categories) => setCategories(categories));
        useGetCommentsQuery().then((comments) => setComments(comments));
        useGetGirlsQuery().then(girl => setGirls(girl));
    }, []);
    return (
        <div className={styles.girls}>
            <Header />
            <main className={styles.girls__main}>
                <section className={styles.girls__main__interests}>
                    <h2 className={styles.girls__main__interests__title}>What do you want to see today?</h2>
                    <ul className={styles.girls__main__interests__list}>
                        {
                            services.map((service) => (
                                <Button text={service.title} className={styles.girls__main__interests__list__button} />
                            ))
                        }
                    </ul>
                </section>
                <section className={styles.girls__main__categories}>
                    <h2 className={styles.girls__main__categories__title}>Girls</h2>
                    <ul className={styles.girls__main__categories__list}>
                        {
                            categories.map((category) => (
                                <li key={category.title} className={styles.girls__main__categories__list__item}>
                                    <NavButton text={category.title} path="" className={styles.girls__main__categories__list__item__anchor} />
                                </li>
                            ))
                        }
                    </ul>
                </section>
            </main>
            <div className={styles.girls__large_background}>

                <section className={styles.girls__large_background__preview}>
                    <h4 className={styles.girls__large_background__preview__title}>Total of girls {'x'}</h4>
                    <ul className={styles.girls__large_background__preview__list}>
                        <GirlList girls={girls} />
                    </ul>
                    


                </section>
                
                

                <Comments comments={comments} />
                <Footer />
            </div>
        </div>
    )
}