import { ServiceResponse } from "../../../lib/types/types"

import styles from './checkServices.module.scss'


interface Props extends ServiceResponse {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    className?: string
    defaultChecked?: boolean
    checked?: boolean
}

export const CheckServices = ({ title, onChange, className, defaultChecked, checked }: Props) => {
    return (
        <article className={`${styles.check_services} ${className}`}>
            <input checked={checked} defaultChecked={defaultChecked} type="checkbox" id={title} className={styles.check_services__input} onChange={onChange} />
            <label htmlFor={title} className={styles.check_services__label}>{title}</label>
        </article>
    )
}