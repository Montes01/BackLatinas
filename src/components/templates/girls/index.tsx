import { useEffect, useState } from "react";
import { Service } from "../../../lib/types/types";
import { Header } from "../../molecules/Header/header"
import styles from './girls.module.scss';
import { GET_SERVICES_MOCKS } from "../../../helpers/mocks";
import { Button } from "../../atoms/Button/button";
export const GirlsPage = () => {

    const [services, setServices] = useState<Array<Service>>([]);

    useEffect(() => {
        GET_SERVICES_MOCKS().then((services) => setServices(services));
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
                                <Button text={service.title} />
                            ))
                        }
                    </ul>
                </section>
                <section className={styles.girls__main__categories}>
                    <h2 className={styles.girls__main__categories__title}>Girls</h2>
                    <ul>

                    </ul>
                </section>
            </main>
        </div>
    )
}