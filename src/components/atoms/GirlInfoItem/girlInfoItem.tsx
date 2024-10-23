interface Props {
    label: string
    value: string
    canEdit?: boolean
    onInputChanged?: (key: string, text: string) => void
    name?: string
}

import { useEffect } from 'react'
import styles from './girlInfoItem.module.scss'

export const GirlInfoItem = ({ label, value, canEdit, onInputChanged, name }: Props) => {
    const handleUncoherentProps = () => {
        if (canEdit && !onInputChanged) {
            throw new Error('If canEdit is true, onInputChanged must be defined.')
        }

        if (onInputChanged && !name) {
            throw new Error('If canEdit is true, name must be defined.')    
        }
    }

    useEffect(() => {
        handleUncoherentProps()
    }, [label, value, canEdit, onInputChanged, name])

    return (
        <li className={styles.item}>
            <strong>{label}</strong>
            {canEdit ?
                <input name={name} type="text" defaultValue={value} className={styles.item__input} onChange={onInputChanged ? (e) => onInputChanged(name!, e.target.value) : undefined} /> :
                <span>{value}</span>
            }
        </li>
    )
}