import classes from "./style.module.css"
import React, { useEffect, useState} from "react"
import {useHistory} from "react-router"
import {PlayerCards} from "./component/PlayerCards"
import {Pokemon} from "../../../utils/types"
import {useAppDispatch, useAppSelector} from "../../../store/hooks"
import {addPokemon, onClearPokemons} from "../../../store/game";

export const FinishPage = () => {
    const { player2Cards, selectedPokemons } = useAppSelector(state => state.game)
    const { isFinished } = useAppSelector(state => state.board)
    const dispatch = useAppDispatch()
    const player1 = selectedPokemons.map(item => item[1])
    const player2 = player2Cards?.map(item => ({
        ...item,
        possession: 'red',
        player: 2
    }))
    const history = useHistory()
    const [choiceCard, setChoiceCard] = useState<Pokemon | undefined>()
    const [isEnd, setIsEnd] = useState(false)

    useEffect(() => {
        if (isEnd) {
            if (choiceCard) {
                dispatch(addPokemon(choiceCard))
            }
            dispatch(onClearPokemons())
            history.push('/game')
        }
        return () => setIsEnd(false)
    }, [isEnd])

    const handleEnd = () => {
        setIsEnd(true)
    }

    const handleChoice = (card: Pokemon) => {
       setChoiceCard(card)
    }

    if (!isFinished) {
        history.replace('/game')
    }

    return(
        <div>
            <h1>Finish Page</h1>
            <div className={classes.flex}>
                {player1 && <PlayerCards cards={player1} />}
            </div>
            <button className={classes.btn} onClick={handleEnd}>
                End Game
            </button>
            <div className={classes.flex}>
                {player2 &&
                <PlayerCards
                    onChoice={handleChoice}
                    cards={player2}
                />}
            </div>
        </div>
    )
}