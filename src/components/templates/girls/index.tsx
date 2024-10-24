import { useEffect, useState } from "react";
import { Service, Comment as CommentType,  GirlResponse, FilterResponse } from "../../../lib/types/types";
import { Header } from "../../molecules/Header/header"
import styles from './girls.module.scss';
import { Button } from "../../atoms/Button/button";
import { NavButton } from "../../atoms/NavButton/navButton";
import { Comments } from "../../organisms/Comments/comments";
import { Footer } from "../../molecules/Footer/footer";
import { GirlList } from "../../organisms/GirlList/girlList";
import { BackButton } from "../../molecules/BackButton/backButton";
import { getComments, getFilters, getGirls, getGirlsCount, getServices } from "../../../lib/services/api";
export const GirlsPage = () => {

    const [services, setServices] = useState<Array<Service>>([]);
    const [categories, setCategories] = useState<FilterResponse>({});
    const [comments, setComments] = useState<Array<CommentType>>([]);
    const [girls, setGirls] = useState<Array<GirlResponse>>([]);
    const [totalGirls, setTotalGirls] = useState<number>(0);
    useEffect(() => {
        getServices().then((services) => setServices(services));
        getFilters().then((categories) => setCategories(categories));
        getComments().then((comments) => setComments(comments));
        getGirls().then(girl => setGirls(girl));
    }, []);

    useEffect(() => {
        getGirlsCount().then((count) => setTotalGirls(count));
    }, [])
        
    return (
        <div className={styles.girls}>
            <Header />
            <main className={styles.girls__main}>
                <section className={styles.girls__main__interests}>
                    <BackButton className={styles.girls__main__interests__back} />
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
                            Object.entries(categories).map(([key, value]) => (
                                <li key={key} className={styles.girls__main__categories__list__item}>
                                    <NavButton text={`${key} (${value})`} path="" className={styles.girls__main__categories__list__item__anchor} />
                                </li>
                            ))
                        }
                    </ul>
                </section>
            </main>
            <div className={styles.girls__large_background}>

                <section className={styles.girls__large_background__preview}>
                    <h4 className={styles.girls__large_background__preview__title}>Total of girls {totalGirls}</h4>
                    <ul className={styles.girls__large_background__preview__list}>
                        <GirlList girls={girls as any} />
                    </ul>



                </section>



                <Comments comments={comments} />
                <Footer />
            </div>
        </div>
    )
}