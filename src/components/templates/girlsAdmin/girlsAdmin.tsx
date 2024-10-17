import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Category,
  Service,
  Comment as CommentType,
  Girl
} from "../../../lib/types/types"; // Make sure Girl type is defined in types
import { Header } from "../../molecules/Header/header";
import styles from "./GirlsAdmin.module.scss";
import {
  GET_CATEGORIES_MOCK as useGetCategoriesQuery,
  GET_SERVICES_MOCKS as useGetServicesQuery,
  GET_COMMENTS_MOCK as useGetCommentsQuery,
  GET_GIRLS_MOCK as useGetGirlsQuery,
} from "../../../helpers/mocks";
import { Button } from "../../atoms/Button/button";
import { NavButton } from "../../atoms/NavButton/navButton";
import { Comments } from "../../organisms/Comments/comments";
import { Footer } from "../../molecules/Footer/footer";
import { HOME_TEXTS } from "../../../lib/constants/homeConstants";
import { GirlList } from "../../organisms/GirlList/girlList";
import { Arrow } from "../../atoms/Arrow/arrow";
import { Search } from "lucide-react";

export const GirlsAdmin = () => {
  const [services, setServices] = useState<Array<Service>>([]);
  const [categories, setCategories] = useState<Array<Category>>([]);
  const [comments, setComments] = useState<Array<CommentType>>([]);
  const [girls, setGirls] = useState<Array<Girl>>([]); // Added girls state
  const navigate = useNavigate();

  useEffect(() => {
    useGetServicesQuery().then((services) => setServices(services));
    useGetCategoriesQuery().then((categories) => setCategories(categories));
    useGetCommentsQuery().then((comments) => setComments(comments));
    useGetGirlsQuery().then((girls) => setGirls(girls)); // Corrected setGirls usage
  }, []);

  return (
    <div className={styles.girls}>
      <Header />
      <main className={styles.girls__main}>
        <div className={styles.girlBase__backContainer}>
          <Arrow className={styles.girlBase__backContainer__arrow} />
          <Button
            text="Back"
            className={styles.girlBase__backContainer__back}
            onClick={() => navigate(-1)}
          />{" "}
        </div>
        <section className={styles.girls__main__interests}>
          <h2>Manage Profiles</h2>
        </section>
        <section className={styles.girls__main__categories}>
<div className={styles.addedGirlContainer}>
    <Button
        text="Add Girl"
        className={styles.addedGirlButton}
        onClick={() => console.log("Add Girl button clicked")}
    />
    <div className={styles.addedGirlInputContainer}>
        <input
            type="text"
            placeholder="Search Girl"
            className={styles.addedGirlInput}
        />
        <Search className={styles.searchIcon} />
    </div>
    <div className={styles.buttonGroup}>
        <button>Independent Girls (20)</button>
        <button>My Girls (30)</button>
    </div>
</div>
</section>

      </main>
      <div className={styles.girls__large_background}>
        <section className={styles.girls__large_background__preview}>
          <h4 className={styles.girls__large_background__preview__title}>
            {/* Total of girls {girls.length} */}
          </h4>
          <ul className={styles.girls__large_background__preview__list}>
            {girls.map((girl) => (
              <li key={girl.id} className={styles.girlItem}>
                <GirlList girls={[girl]} />
                <div className={styles.buttonGroup}>
                  <Button
                    text="Edit"
                    className={styles.editButton}
                    onClick={() => handleEdit(girl.id)}
                  />
                  <Button
                    text="Delete"
                    className={styles.deleteButton}
                    onClick={() => handleDelete(girl.id)}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>
        <Footer />
      </div>
    </div>
  );
};
