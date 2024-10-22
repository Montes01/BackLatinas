import { useEffect, useState } from "react";
import { GirlResponse } from "../../../lib/types/types";
import { Header } from "../../molecules/Header/header";
import styles from "./GirlsAdmin.module.scss";
import { GET_GIRLS_MOCK as useGetGirlsQuery, } from "../../../helpers/mocks";
import { Button } from "../../atoms/Button/button";
import { Footer } from "../../molecules/Footer/footer";
import { GirlCard } from "../../molecules/GirlCard/girlCard";
import { BackButton } from "../../molecules/BackButton/backButton";
import { Input } from "../../atoms/Input/input";
import { getGirls } from "../../../lib/services/api";
import { Loader } from "../../atoms/Loader/loader";

export const GirlsAdmin = () => {
  const [girls, setGirls] = useState<Array<GirlResponse>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    try {
      getGirls().then(data => {
        setLoading(false);
        setGirls(data)
      });
    } catch (err) {
      console.error(err);
    }
  }, []);


  const handleEdit = (id: number) => {
  }

  const handleDelete = (id: number) => {
  }

  return (
    <div className={styles.girls}>
      <Header />
      <main className={styles.girls__main}>
        <section className={styles.girls__main__interests}>
          <BackButton className={styles.girls__main__interests__back} />
          <h2>Manage Profiles</h2>
        </section>
        <section className={styles.girls__main__actions}>
          <section className={styles.girls__main__actions__buttons}>
            <Button text="Applications" className={styles.girls__main__actions__buttons__applications} />
            <Button text="Add Girl" className={styles.girls__main__actions__buttons__add} />
          </section>
          <Input placeholder="Search girl" label="" className={styles.girls__main__actions__search} />
          <section className={styles.girls__main__actions__info}>
            <Button disabled text={`Independent girls`} className={styles.girls__main__actions__info__independent} />
            <Button disabled text={`My girls`} className={styles.girls__main__actions__info__main} />
          </section>
        </section>

        {loading ? <Loader /> :
          <ul className={styles.girls__main__list}>
            {girls.map((girl) => (
              <li key={girl.name} className={styles.girls__main__list__item}>
                <GirlCard {...girl} />
                <div className={styles.girls__main__list__item__buttonGroup}>
                  <Button
                    text="Edit"
                    className={styles.girls__main__list__item__buttonGroup__editButton}
                    onClick={() => handleEdit(girl.age)}
                  />
                  <Button
                    text="Delete"
                    className={styles.girls__main__list__item__buttonGroup__deleteButton}
                    onClick={() => handleDelete(girl.age)}
                  />
                </div>
              </li>
            ))}
          </ul>}
        <Footer />
      </main>
    </div>
  );
};
