interface Props {
    rule?: string
    required?: boolean
    title?: string
    important?: boolean
    children?: React.ReactNode
    labelUrl?: string
}
import styles from './rule.module.scss'

export const Rule = ({ rule, required, title, important, children, labelUrl }: Props) => {
    return (
        <div className={styles.rulesSection}>
            <label className={styles.rulesSection__label}>
                <input
                    type="checkbox"
                    required={required}
                />
                {
                    labelUrl ? (
                        <a href={labelUrl} className={styles.rulesSection__label__text}>{title}</a>
                    ) : title
                }
            </label>
            <p className={styles[`rulesSection__text${important ? '--important' : ''}`]}>
                {rule}
            </p>
            {children}
        </div>
    )
}