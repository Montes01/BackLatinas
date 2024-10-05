import { Header } from "../../molecules/Header/header"

interface Props {
    girlId: string
}
export const GirlPage = ({ girlId }: Props) => {
    
    return (
        <div>
            <Header />
            GirlPage {girlId}
        </div>
    )
}