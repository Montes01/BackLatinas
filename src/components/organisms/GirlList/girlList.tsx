import { GirlResponse } from "../../../lib/types/types";
import { GirlCard } from "../../molecules/GirlCard/girlCard";

interface Props {
    girls: GirlResponse[]
}

export const GirlList = ({ girls }: Props) => {
    return girls.map(girl => (
        <GirlCard {...girl} />
    ))
}