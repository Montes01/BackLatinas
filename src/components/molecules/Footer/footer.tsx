import { HOME_TEXTS, PAYMENT_METHODS } from '../../../lib/constants/homeConstants';
import styles from './footer.module.scss';
export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <section className={styles.footer__payment_methods}>
                {PAYMENT_METHODS.map((method, index) => (
                    <img key={`Payment-${index}`} src={`/assets/payment_methods/${method}.png`} alt={method} className={styles.footer__payment_methods__img} />
                ))}
            </section>
            <h4 className={styles.footer__privacy_policy}>
                Privacy Policy
            </h4>
            <h3 className={styles.footer__terms_and_conditions}>
                Terms and conditions
            </h3>
            {HOME_TEXTS.PHARAGRAHPS.FOOTER.map((paragraph, index) => (
                <p key={`Footer-paragraph-${index}`} className={styles.footer__paragraph}>
                    {paragraph}
                </p>
            ))}
            <div className={styles.footer__copy}>
                <p className={styles.footer__copy__text}>
                    Copyright LatinasSexCam™
                </p>
            </div>
        </footer>
    )
}