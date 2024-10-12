import { ROUTES } from '../../../lib/constants/routes'
import { Women } from '../../../lib/types/types'
import { Button } from '../../atoms/Button/button'
import styles from './girlCard.module.scss'
export const GirlCard = ({ user: { id_user, profile_photo, nacionality }, name }: Women) => {

    const onImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        event.currentTarget.src = '/assets/default-girl.png'
    }
    return (
        <article className={styles.girlCard}>
            <img onError={onImageError} className={styles.girlCard__picture} src={profile_photo} alt={name} />
            <div className={styles.girlCard__info}>
                <div className={styles.girlCard__info__nameContainer}>
                    <h3 className={styles.girlCard__name}>{name}</h3>
                    {/* {isVerified && <StarRate />} */}
                </div>
                <p className={styles.girlCard__country}>{nacionality}</p>
            </div>
            <Button className={styles.girlCard__button} text="View more" url={ROUTES.GIRL.SINGLE_GIRL.replace(':id', id_user.toString())} />
        </article>
    )
}