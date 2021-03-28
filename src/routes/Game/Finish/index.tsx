import classes from "./style.module.css"
import React, {useContext, useEffect, useState} from "react"
import {PokemonContext} from "../../../context/pokemonContext"
import {useHistory} from "react-router"
import {PlayerCards} from "./component/PlayerCards"
import {Pokemon} from "../../../utils/types"
import {FireBaseContext} from "../../../context/firabaseContext"

export const FinishPage = () => {
    const pokemonContext = useContext(PokemonContext)
    const firebase = useContext(FireBaseContext)
    const history = useHistory()
    const [choiceCard, setChoiceCard] = useState<Pokemon | undefined>()
    const [addedPokemon, setAddedPokemon] = useState<Pokemon | null>(null)

    useEffect(() => {
        if (addedPokemon) {
            firebase?.addPokemon(addedPokemon)
            pokemonContext?.onClear()
            history.push('/')
        }
    }, [addedPokemon, firebase])

    const handleEnd = () => {
        if (choiceCard) {
            setAddedPokemon(choiceCard)
        }
        if (pokemonContext?.winner !== 1) {
            pokemonContext?.onClear()
            history.push('/')
        }
    }

    const handleChoice = (card: Pokemon) => {
       setChoiceCard(card)
    }

    if (!pokemonContext?.isFinished) {
        history.replace('/game')
    }

    return(
        <div>
            <h1>Finish Page</h1>
            <div className={classes.flex}>
                {pokemonContext?.player1 && <PlayerCards cards={pokemonContext.player1} />}
            </div>
            <button className={classes.btn} onClick={handleEnd}>
                End Game
            </button>
            <div className={classes.flex}>
                {pokemonContext?.player2 &&
                <PlayerCards
                    onChoice={handleChoice}
                    cards={pokemonContext.player2}
                />}
            </div>
        </div>
    )
}