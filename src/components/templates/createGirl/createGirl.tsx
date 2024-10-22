import ReactFlagsSelect from 'react-flags-select'
import { BackButton } from '../../molecules/BackButton/backButton'
import { Header } from '../../molecules/Header/header'
import styles from './createGirl.module.scss'
import { Input } from '../../atoms/Input/input'
import { useEffect, useRef, useState } from 'react'
import { Edit } from '@mui/icons-material'
export const CreateGirl = () => {
    const [canEditName, setCanEditName] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const [selectedCountry, setSelectedCountry] = useState('')
    const handleInputBlur = () => {
        setCanEditName(false)
    }
    const handleEditName = () => {
        setCanEditName(true)
    }

    useEffect(() => {
        if (canEditName)
            inputRef.current?.focus()
    }, [canEditName])

    return (
        <div>
            <Header />
            <main className={styles.large_section_wrapper}>
                <BackButton className={styles.large_section_wrapper__form__back_button} />
                <form className={styles.large_section_wrapper__form} >
                    <ReactFlagsSelect
                        onSelect={(countryCode) => setSelectedCountry(countryCode)}
                        showOptionLabel
                        showSecondaryOptionLabel
                        selected={selectedCountry}
                        countries={["US", "GB", "FR", "DE", "IT", "ES"]}
                        className={styles.large_section_wrapper__form__country}
                    />

                    <section className={styles.large_section_wrapper__form__name}>
                        <button type='button' onClick={handleEditName} className={styles.large_section_wrapper__form__name__edit_button}>
                            <Edit />
                        </button>
                        <Input disabled={!canEditName} reference={inputRef} onBlur={handleInputBlur} placeholder="Name" className={styles.large_section_wrapper__form__name__input} />
                    </section>

                    <section className={styles.large_section_wrapper__form__profile_pic}>
                        <label htmlFor="profile_pic" className={styles.large_section_wrapper__form__profile_pic__label}>Chose Profile Photo</label>
                        <input type="file" id="profile_pic" className={styles.large_section_wrapper__form__profile_pic__input} />
                    </section>

                    <section className={styles.large_section_wrapper__form__information}>

                    </section>
                </form>
            </main>
        </div>
    )
}