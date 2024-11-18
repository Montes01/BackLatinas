import { SubService } from "../../../lib/types/types";

interface Props extends SubService { }

import styles from './subServiceCard.module.scss'

export const SubServiceCard = ({ description, price, time, quantity }: Props) => {
    return (
        <div className={styles.subServiceCard}>
            <div className={styles.subServiceCard__info}>
                <h2 className={styles.subServiceCard__info__time}> {time ?? quantity}</h2>
                <h3 className={styles.subServiceCard__info__desc}>{description}</h3>
                <strong className={styles.subServiceCard__info__price}>{price} NOK</strong>
            </div>
        </div>
    )
}