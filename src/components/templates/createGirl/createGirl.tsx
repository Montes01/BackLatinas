import ReactFlagsSelect from 'react-flags-select'
import { BackButton } from '../../molecules/BackButton/backButton'
import { Header } from '../../molecules/Header/header'
import styles from './createGirl.module.scss'
import { Input } from '../../atoms/Input/input'
import { useEffect, useRef, useState } from 'react'
import { Edit, Save } from '@mui/icons-material'
import { GirlInfoItem } from '../../atoms/GirlInfoItem/girlInfoItem'
import { FilterResponse, ServiceResponse, WomenRequest } from '../../../lib/types/types'
import { getFilters, getGirlByUsername, getServices, postGirlByAdmin, updateGirlByAdmin } from '../../../lib/services/api'
import { Loader } from '../../atoms/Loader/loader'
import { CheckServices } from '../../molecules/CheckServices/checkServices'
import { Button } from '../../atoms/Button/button'
import { Footer } from '../../molecules/Footer/footer'
import { AlertModal, AlertModalProps } from '../../molecules/AlertModal/alertModal'
import { useParams } from 'react-router-dom'

export const CreateGirl = () => {
    const { username } = useParams<{ username: string }>()
    const [canEditName, setCanEditName] = useState(false)
    const [canEditInfo, setCanEditInfo] = useState(false)
    const [canEditDescription, setCanEditDescription] = useState(false)
    const [services, setServices] = useState<ServiceResponse[]>([])
    const [filters, setFilters] = useState<FilterResponse>({})
    const [areServicesLoading, setAreServicesLoading] = useState(true)
    const [areFiltersLoading, setAreFiltersLoading] = useState(true)

    const [girlInfo, setGirlInfo] = useState<WomenRequest>({
        age: 0,
        height: 0,
        weight: 0,
        hips: 0,
        shoeSize: 0,
        colorHair: '',
        colorEyes: '',
        colorSkin: '',
        cupSize: '',
        shaving: '',
        smoker: '',
        user_name: '',
        description: '',
        nationality: '',
        piercings: 0,
        tattoos: 0,
        name: '',
        selectedServiceIds: [] as number[],
        selectedFilterNames: [] as string[]
    })

    useEffect(() => {
        if (username) {
            try {
                getGirlByUsername(username).then((data) => {
                    setGirlInfo(data)
                    console.log(data)
                })
            } catch (error) {
                console.error('Error al obtener la chica:', error)
            }
        }
    }, [])

    const [alertModalProps, setAlertModalProps] = useState<AlertModalProps>({
        isOpen: false,
        message: 'Are you sure you want to add this girl?',
        onCancel: () => setAlertModalProps(prev => ({ ...prev, isOpen: false })),
        onOk: () => { },
        isLoading: false
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const endpoint = !username ? postGirlByAdmin : updateGirlByAdmin
        setAlertModalProps(prev => ({
            ...prev, isOpen: true, onOk: async () => {
                setAlertModalProps(prev => ({ ...prev, isLoading: true }))
                try {
                    await endpoint(girlInfo)
                    setAlertModalProps(prev => ({
                        ...prev,
                        message: username ? "Girl Updated succesfully" :"Girl Created succesfully",
                        isLoading: false,
                        onCancel: undefined,
                        onOk: () => setAlertModalProps(prev => ({ ...prev, isOpen: false }))
                    }))
                } catch (error) {
                    setAlertModalProps(prev => ({
                        ...prev,
                        message: username ? "There was an error updating the girl" : "There was an error creating the girl",    
                        isLoading: false,
                        onCancel: undefined,
                        onOk: () => setAlertModalProps(prev => ({ ...prev, isOpen: false }))
                    }))
                }
            }
        }))
    }

    const inputRef = useRef<HTMLInputElement>(null)
    const areaRef = useRef<HTMLTextAreaElement>(null)
    const handleInputBlur = () => {
        setCanEditName(false)
        const name = inputRef.current?.value!
        const user_name = name.toLowerCase()! + Math.floor(Math.random() * 1000)
        setGirlInfo(prev => ({ ...prev, name, user_name }))
    }
    const handleEditName = () => {
        setCanEditName(true)
    }
    const handleEditInfo = () => {
        setCanEditInfo(!canEditInfo)
    }
    const handleEditDescription = () => {
        setCanEditDescription(prev => {
            if (prev) {
                setGirlInfo(prev => ({ ...prev, description: areaRef.current?.value ?? '' }))
            }
            return !prev
        })

    }

    const handleCountrySelect = (countryCode: string) => {
        setGirlInfo(prev => ({ ...prev, nationality: countryCode }))
    }


    const handleInfoItemChange = (key: string, text: string) => {
        setGirlInfo(prev => ({ ...prev, [key]: text }))
    }

    useEffect(() => {
        if (canEditName)
            inputRef.current?.focus()
    }, [canEditName])

    useEffect(() => {
        try {
            getServices().then((data) => {
                setServices(data)
                setAreServicesLoading(false)
            })
        } catch (error) {
            console.error('Error al obtener los servicios:', error)
            setAreServicesLoading(false)
        }

        try {
            getFilters().then((data) => {
                setFilters(data)
                setAreFiltersLoading(false)
            })
        } catch (error) {
            console.error('Error al obtener los filtros:', error)
            setAreFiltersLoading(false)
        }
    }, [])


    return (
        <div>
            <Header />
            <main className={styles.large_section_wrapper}>
                <BackButton className={styles.large_section_wrapper__form__back_button} />
                <form onSubmit={handleSubmit} className={styles.large_section_wrapper__form} >
                    <ReactFlagsSelect
                        onSelect={handleCountrySelect}
                        showOptionLabel
                        showSecondaryOptionLabel
                        selected={girlInfo.nationality}
                        countries={["US", "GB", "FR", "DE", "IT", "ES"]}
                        className={styles.large_section_wrapper__form__country}
                    />

                    <section className={styles.large_section_wrapper__form__name}>
                        <button type='button' onClick={handleEditName} className={styles.large_section_wrapper__form__name__edit_button}>
                            {!canEditName ? <Edit /> : <Save />}
                        </button>
                        <Input defaultValue={girlInfo?.name} disabled={!canEditName} reference={inputRef} onBlur={handleInputBlur} placeholder="Name" className={styles.large_section_wrapper__form__name__input} />
                    </section>

                    <section className={styles.large_section_wrapper__form__profile_pic}>
                        <label htmlFor="profile_pic" className={styles.large_section_wrapper__form__profile_pic__label}>Chose Profile Photo</label>
                        <input type="file" id="profile_pic" className={styles.large_section_wrapper__form__profile_pic__input} />
                    </section>

                    <section className={styles.large_section_wrapper__form__information}>
                        <h2 className={styles.large_section_wrapper__form__information__title}>Information</h2>
                        <button type='button' onClick={handleEditInfo} className={styles.large_section_wrapper__form__information__edit_button}>
                            {!canEditInfo ? <Edit /> : <Save />}
                        </button>
                        <section className={styles.large_section_wrapper__form__information__lists}>
                            <ul className={styles.large_section_wrapper__form__information__lists__list}>
                                <GirlInfoItem name='age' label='Age:' value={`${girlInfo.age}`} canEdit={canEditInfo} onInputChanged={handleInfoItemChange} />
                                <GirlInfoItem name='height' label='Height (cm):' value={`${girlInfo.height}`} canEdit={canEditInfo} onInputChanged={handleInfoItemChange} />
                                <GirlInfoItem name='weight' label='Weight (kg):' value={`${girlInfo.weight}`} canEdit={canEditInfo} onInputChanged={handleInfoItemChange} />
                                <GirlInfoItem name='hips' label='Hips:' value={`${girlInfo.hips}`} canEdit={canEditInfo} onInputChanged={handleInfoItemChange} />
                                <GirlInfoItem name='shoeSize' label='Shoe size:' value={`${girlInfo.shoeSize}`} canEdit={canEditInfo} onInputChanged={handleInfoItemChange} />
                                <GirlInfoItem name='colorHair' label='Hair color:' value={`${girlInfo.colorHair}`} canEdit={canEditInfo} onInputChanged={handleInfoItemChange} />
                                <GirlInfoItem name='colorEyes' label='Eye color:' value={`${girlInfo.colorEyes}`} canEdit={canEditInfo} onInputChanged={handleInfoItemChange} />
                                <GirlInfoItem name='colorSkin' label='Skin color:' value={`${girlInfo.colorSkin}`} canEdit={canEditInfo} onInputChanged={handleInfoItemChange} />
                                <GirlInfoItem name='cupSize' label='Cup size:' value={`${girlInfo.smoker}`} canEdit={canEditInfo} onInputChanged={handleInfoItemChange} />
                            </ul>
                            <ul className={styles.large_section_wrapper__form__information__lists__list}>
                                <GirlInfoItem name='shaving' label='Shaving:' value={`${girlInfo.shaving}`} canEdit={canEditInfo} onInputChanged={handleInfoItemChange} />
                                <GirlInfoItem name='smoker' label='Smoker:' value={`${girlInfo.smoker}`} canEdit={canEditInfo} onInputChanged={handleInfoItemChange} />
                                <GirlInfoItem label='Nationality:' value={`${girlInfo.nationality}`} />
                                <GirlInfoItem name='piercings' label='Piercings:' value={`${girlInfo.piercings}`} canEdit={canEditInfo} onInputChanged={handleInfoItemChange} />
                                <GirlInfoItem name='tattoos' label='Tattoos:' value={`${girlInfo.tattoos}`} canEdit={canEditInfo} onInputChanged={handleInfoItemChange} />
                            </ul>
                        </section>
                    </section>

                    <section className={styles.large_section_wrapper__form__services}>
                        <h2 className={styles.large_section_wrapper__form__services__title}>Services</h2>
                        <ul className={styles.large_section_wrapper__form__services__list}>
                            {
                                areServicesLoading ? <Loader /> :

                                    services.map(service => (
                                        <CheckServices
                                            {...service}
                                            key={service.idService}
                                            onChange={(e) => {
                                                if (!e.target.checked)
                                                    setGirlInfo(prev => ({ ...prev, selectedServiceIds: prev.selectedServiceIds.filter(id => id !== service.idService) }))
                                                else
                                                    setGirlInfo(prev => ({ ...prev, selectedServiceIds: [...prev.selectedServiceIds, service.idService] }))
                                            }}
                                            checked={girlInfo?.selectedServiceIds?.includes(service.idService)}
                                        />
                                    ))

                            }
                        </ul>
                    </section>

                    <section className={styles.large_section_wrapper__form__filters}>
                        <ul className={styles.large_section_wrapper__form__filters__list}>
                            {
                                areFiltersLoading ? <Loader /> :
                                    Object.entries(filters).map(([key, value]) => (
                                        <CheckServices
                                            key={key}
                                            idService={value}
                                            title={`${key} (${value})`}
                                            onChange={(e) => {
                                                if (!e.target.checked)
                                                    setGirlInfo(prev => ({ ...prev, selectedFilterNames: prev.selectedFilterNames.filter(name => name !== key) }))
                                                else
                                                    setGirlInfo(prev => ({ ...prev, selectedFilterNames: [...prev.selectedFilterNames, key] }))
                                            }}
                                            className={styles.large_section_wrapper__form__filters__list__item}
                                            checked={girlInfo?.selectedFilterNames?.includes(key)}

                                        />
                                    ))
                            }
                        </ul>
                    </section>

                    <section className={styles.large_section_wrapper__form__description}>
                        <button type='button' onClick={handleEditDescription} className={styles.large_section_wrapper__form__information__edit_button}>
                            {!canEditDescription ? <Edit /> : <Save />}
                        </button>
                        <label htmlFor="description" className={styles.large_section_wrapper__form__description__title}>Description of the ad</label>
                        <textarea defaultValue={girlInfo.description} ref={areaRef} id="description" className={styles.large_section_wrapper__form__description__description} disabled={!canEditDescription}></textarea>
                    </section>
                    <section className={styles.large_section_wrapper__form__submit}>
                        <Button type='submit' className={styles.large_section_wrapper__form__submit__button} text='Accept' />
                    </section>
                </form>
                <Footer />
            </main>
            <AlertModal {...alertModalProps} />
        </div>
    )
}