import { Women } from "../../../lib/types/types";
import { GirlCard } from "../../molecules/GirlCard/girlCard";

interface Props {
    girls: Women[]
}

export const GirlList = ({ girls }: Props) => {
    return girls.map(girl => (
        <GirlCard {...girl} />
    ))
}