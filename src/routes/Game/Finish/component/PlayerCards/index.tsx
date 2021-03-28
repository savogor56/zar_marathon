import {PokemonCard} from "../../../../../components/PokemonCard"
import classes from "./style.module.css"
import React, {useState} from "react"
import {Pokemon} from "../../../../../utils/types"
import {useAppSelector} from "../../../../../store/hooks"

interface Props {
    cards: Pokemon[]
    onChoice?: (card: Pokemon) => void
}

export const PlayerCards: React.FC<Props> = ({ cards, onChoice }) => {
    const [selected, setSelected] = useState<number | undefined>()
    const winner = useAppSelector(state => state.game.winner)

    return (
        <>
            {
                cards.map(item => (
                    <div
                        key={item.id}
                        className={classes.card}
                        onClick={() => {
                            if (winner === 1) {
                                setSelected(item.id)
                                onChoice && onChoice(item)
                            }
                        }}
                    >
                        <PokemonCard
                            name={item.name}
                            img={item.img}
                            id={item.id}
                            type={item.type}
                            values={item.values}
                            className={classes.card}
                            isActive
                            isSelected={selected === item.id && item.possession === 'red'}
                        />
                    </div>
                ))
            }
        </>
    )
}