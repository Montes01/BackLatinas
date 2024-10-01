import { Girl } from '../../../lib/types/types'
import { Button } from '../../atoms/Button/button'
import { StarRate } from '../../atoms/StarRate/StarRate'
import styles from './girlCard.module.scss'
export const GirlCard = ({ country, isVerified, name, picture }: Girl) => {

    const onImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        event.currentTarget.src = '/assets/default-girl.png'
    }
    return (
        <article className={styles.girlCard}>
            <img onError={onImageError} className={styles.girlCard__picture} src={picture} alt={name} />
            <div className={styles.girlCard__info}>
                <div className={styles.girlCard__info__nameContainer}>
                    <h3 className={styles.girlCard__name}>{name}</h3>
                    {isVerified && <StarRate />}
                </div>
                <p className={styles.girlCard__country}>{country}</p>
            </div>
            <Button className={styles.girlCard__button} text="View more" />
        </article>
    )
}