import {Pokemon} from "../../../../../utils/types"
import classes from "./style.module.css"
import {PokemonCard} from "../../../../../components/PokemonCard"
import React, {useState} from "react"
import cn from "classnames"

interface Props {
    cards: Pokemon[]
    onClickCard: (card: Pokemon) => void
    player: number
    activePlayer: number
}

export const PlayerBoard: React.FC<Props> = ({cards, onClickCard, player, activePlayer}) => {
    const [isSelected, setSelected] = useState<number | undefined>()
    return (
        <>
            {
                cards.map(item => (
                    <div
                        className={cn(classes.cardBoard,{
                            [classes.selected]: isSelected === item.id
                        })}
                        onClick={() => {
                            if (activePlayer === player) {
                                setSelected(item.id)
                                onClickCard({
                                    ...item,
                                    player: player
                                })
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
                        minimize
                    />
                    </div>
                ))
            }
        </>
    )
}