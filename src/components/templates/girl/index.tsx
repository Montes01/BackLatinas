import { Header } from "../../molecules/Header/header"
import { GET_GIRL_INFO_MOCK as useGetGirlInfoQuery, GET_GIRLS_MOCK as useGetGirlsQuery } from "../../../helpers/mocks"
import { Women } from "../../../lib/types/types"
import styles from './girl.module.scss'
import { useEffect, useState } from "react"
import { Button } from "../../atoms/Button/button"
import { GirlInfoItem } from "../../atoms/GirlInfoItem/girlInfoItem"
import { SubServiceCard } from "../../molecules/SubServiceCard/SubServiceCard"
import { Footer } from "../../molecules/Footer/footer"
import { GirlList } from "../../organisms/GirlList/girlList"
import { Arrow } from "../../atoms/Arrow/arrow"
import { useNavigate } from "react-router-dom"
interface Props {
    girlId: string
}
export const GirlPage = ({ girlId }: Props) => {
    const [girlInfo, setGirlInfo] = useState({} as Women)
    const [girls, setGirls] = useState([] as Women[])
    const [selectedService, setSelectedService] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        useGetGirlInfoQuery(girlId).then((girlInfo) => setGirlInfo(girlInfo)).catch(_ => navigate('/home'))    
        useGetGirlsQuery().then(girls => setGirls(girls))
    }, [])

    const photos = girlInfo?.mediaList?.filter(el => el.mediaType === 'PHOTO') ?? []
    const videos = girlInfo?.mediaList?.filter(el => el.mediaType === 'VIDEO') ?? []
    const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        event.currentTarget.src = '/assets/noGirl.png'
    }

    const handleServiceClick = (serviceId: number) => {
        setSelectedService(serviceId)
    }
    return girlInfo.name && (
        <div>
            <Header />
            <section className={styles.bigBg}>

                <section className={styles.girlBase}>
                    <div className={styles.girlBase__backContainer}>
                        <Arrow className={styles.girlBase__backContainer__arrow}/>
                        <Button text="Back" className={styles.girlBase__backContainer__back} />
                    </div>
                    <section className={styles.girlBase__infoSection}>

                        <div className={styles.girlBase__infoSection__info}>
                            <h1 className={styles.girlBase__infoSection__info__name}>{girlInfo?.name}</h1>
                            <p className={styles.girlBase__infoSection__info__description}>24 Hour Contact</p>
                        </div>
                        <div className={styles.girlBase__infoSection__nation}>
                            <strong>{girlInfo?.user?.nacionality}</strong>
                            <img src="/assets/flag-example.png" alt="" />
                        </div>
                    </section>
                </section>
                <section className={styles.girlPicture}>
                    <img onError={handleImageError} src={girlInfo?.user?.profile_photo} alt={girlInfo?.name} />
                </section>



                <div className={styles.girlImages} >
                    <h2>Photos ({photos.length})</h2>
                    <section className={styles.girlImages__container}>
                        {
                            [photos[0], photos[1], photos[2]].map((image) => (
                                <img onError={handleImageError} src={image?.url} alt={girlInfo?.name} />
                            ))
                        }
                    </section>
                    <Button text="View More" className={styles.girlImage__button} />
                </div>

                <div className={styles.girlVideos} >
                    <h2>Videos ({videos.length})</h2>
                    <section className={styles.girlVideos__container}>
                        {
                            [videos[0], videos[1]].map((video) => (
                                <video controls>
                                    <source src={video?.url} type="video/mp4" />
                                </video>
                            ))
                        }
                    </section>
                    <Button text="View More" className={styles.girlVideos__button} />
                </div>

                <section className={styles.girlInformationSection}>
                    <h2 className={styles.girlInformationSection__title}>Information</h2>
                    <section className={styles.girlInformationSection__lists}>
                        <ul className={styles.girlInformationSection__lists__list}>
                            <GirlInfoItem label='Age:' value={`${girlInfo.age}`} />
                            <GirlInfoItem label='Height (cm):' value={`${girlInfo.height}`} />
                            <GirlInfoItem label='Weight (kg):' value={`${girlInfo.weight}`} />
                            <GirlInfoItem label='Hips:' value={`${girlInfo.hips}`} />
                            <GirlInfoItem label='Shoe size:' value={`${girlInfo.shoeSize}`} />
                            <GirlInfoItem label='Hair color:' value={`${girlInfo.colorHair}`} />
                            <GirlInfoItem label='Eye color:' value={`${girlInfo.colorEyes}`} />
                            <GirlInfoItem label='Skin color:' value={`${girlInfo.colorSkin}`} />
                            <GirlInfoItem label='Cup size:' value={`${girlInfo.cupSize}`} />
                        </ul>
                        <ul className={styles.girlInformationSection__lists__list}>
                            <GirlInfoItem label='Shaving:' value={`${girlInfo.shaving}`} />
                            <GirlInfoItem label='Smoker:' value={`${girlInfo.smoker}`} />
                            <GirlInfoItem label='Nationality:' value={`${girlInfo.user.nacionality}`} />
                            <GirlInfoItem label='Piercings:' value={`${girlInfo.piercings}`} />
                            <GirlInfoItem label='Tattoos:' value={`${girlInfo.tattoos}`} />
                        </ul>
                    </section>
                </section>

                <section className={styles.girlServices}>
                    <h2 className={styles.girlServices__title}>SERVICES PRICING </h2>
                    <section className={styles.girlServices__girlServicesSection}>
                        {
                            girlInfo.services.map((service) => (
                                <Button onClick={() => handleServiceClick(service.idService)} text={service.title} />
                            ))
                        }
                    </section>
                    <section className={styles.girlServices__girlSubServicesSection}>
                        {
                            girlInfo.services.find(service => service.idService === selectedService)?.subServices.map((subService) => (
                                <SubServiceCard {...subService} description={selectedService + subService.description} />
                            ))
                        }
                    </section>
                </section>

                <section className={styles.girlDescription}>
                    <h2 className={styles.girlDescription__title}>Description of the ad</h2>
                    <p>{girlInfo.description}</p>
                </section>

                <section className={styles.girlRecomendations}>
                    <h2 className={styles.girlRecomendations__title}>RECOMENDATIONS</h2>
                    <ul className={styles.girlRecomendations__list}>
                        <GirlList girls={girls} />
                    </ul>
                </section>

                <Footer />
            </section>

        </div >
    )
}