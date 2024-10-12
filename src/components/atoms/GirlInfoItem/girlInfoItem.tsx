interface Props {
    label: string
    value: string
}

import styles from './girlInfoItem.module.scss'

export const GirlInfoItem = ({ label, value }: Props) => {
    return (
        <li className={styles.item}>
            <strong>{label}</strong>
            <span>{value}</span>
        </li>
    )
}