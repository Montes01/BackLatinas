import { StarRate } from '@mui/icons-material'
import { ROUTES } from '../../../lib/constants/routes'
import { GirlResponse } from '../../../lib/types/types'
import { Button } from '../../atoms/Button/button'
import styles from './girlCard.module.scss'


export const GirlCard = ({ name, nationality, profilePhoto, user_name, namePackage }: GirlResponse) => {
    const isVerified = namePackage === 'PRIORITY'
    const onImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        event.currentTarget.src = '/assets/default-girl.png'
    }
    return (
        <article className={styles.girlCard}>
            <img onError={onImageError} className={styles.girlCard__picture} src={profilePhoto} alt={name} />
            <div className={styles.girlCard__info}>
                <div className={styles.girlCard__info__nameContainer}>
                    <h3 className={styles.girlCard__name}>{name}</h3>
                    {isVerified && <StarRate style={
                        {
                            color: '#FFD700',
                            fontSize: '1.5rem',
                        }
                    } />}
                </div>
                <p className={styles.girlCard__country}>{nationality}</p>
            </div>
            <Button className={styles.girlCard__button} text="View more" url={ROUTES.GIRL.SINGLE_GIRL.replace(':username', user_name)} />
        </article>
    )
}