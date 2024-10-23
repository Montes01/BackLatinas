import { PackageResponse } from "../../../lib/types/types";

interface Props extends PackageResponse {
    checked?: boolean
    onChange?: (value: number) => void
}

import styles from './packageCard.module.scss'

export const PackageCard = ({ description, name, price, checked, idPackage, onChange }: Props) => {

    return (
        <article className={styles.packageCard}>
            <input onChange={onChange ? () => onChange(idPackage) : undefined} name={idPackage?.toString()} type="checkbox" checked={checked} className={styles.packageCard__input} />
            <section className={styles.packageCard__info}>
                <div className={styles.packageCard__viewer} />
                <h2 className={styles.packageCard__info__title}>{name}</h2>
                <strong className={styles.packageCard__info__price}>{price} NOK</strong>
            </section>
            <p className={styles.packageCard__description}>{description}</p>
        </article>
    )
}