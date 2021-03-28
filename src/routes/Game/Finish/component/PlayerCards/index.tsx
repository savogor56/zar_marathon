import {PokemonCard} from "../../../../../components/PokemonCard"
import classes from "./style.module.css"
import React, {useContext, useState} from "react"
import {Pokemon} from "../../../../../utils/types"
import {PokemonContext} from "../../../../../context/pokemonContext";

interface Props {
    cards: Pokemon[]
    onChoice?: (card: Pokemon) => void
}

export const PlayerCards: React.FC<Props> = ({ cards, onChoice }) => {
    const [selected, setSelected] = useState<number | undefined>()
    const pokemonContext = useContext(PokemonContext)

    return (
        <>
            {
                cards.map(item => (
                    <div
                        className={classes.card}
                        onClick={() => {
                            if (pokemonContext?.winner === 1) {
                                setSelected(item.id)
                                onChoice && onChoice(item)
                            }
                        }}
                    >
                        <PokemonCard
                            key={item.id}
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