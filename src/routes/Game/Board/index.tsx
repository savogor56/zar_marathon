import classes from './style.module.css'

import React, {useEffect, useState} from "react"
import {PokemonCard} from "../../../components/PokemonCard"
import {BoardCell, Pokemon} from "../../../utils/types"
import {useHistory} from "react-router"
import {PlayerBoard} from "./component/PlayerBoard"
import {useAppDispatch, useAppSelector} from "../../../store/hooks"
import {setWinner, onFinished, fetchPlayer2Pokemons, fetchBoardCells, updateBoardCells} from "../../../store/game"

const counterWin = (board: BoardCell[], player1: Pokemon[], player2: Pokemon[]) => {
    let player1Count = player1.length
    let player2Count = player2.length

    board.forEach(item => {
        if (item.card?.possession === 'blue') {
            player1Count++
        }

        if (item.card?.possession === 'red') {
            player2Count++
        }
    })

    return [player1Count, player2Count]
}

export const BoardPage = () => {
    const pokemons = useAppSelector(state => state.game.selectedPokemons.map(item => item[1]))
    const {player2Cards, boardCells } = useAppSelector((state => state.game))
    const dispatch = useAppDispatch()
    const [player1,setPlayer1] = useState<Pokemon[] | undefined>(() => pokemons?.map(item => ({
        ...item,
        possession: 'blue'
    })))
    const [player2,setPlayer2] = useState<Pokemon[] | undefined>()
    const [choiceCard,setChoiceCard] = useState<Pokemon | null>(null)
    const [steps, setSteps] = useState(0)
    const [activePlayer, setActivePlayer] = useState(1)
    const [updatedCell, setUpdatedCell] = useState<number | undefined>()

    const history = useHistory()

    useEffect(() => {
        dispatch(fetchPlayer2Pokemons())
        dispatch(fetchBoardCells())
    }, [])

    useEffect(() => {
        if (player2Cards) setPlayer2(player2Cards.map(item => ({
            ...item,
            possession: "red"
        })))
    }, [player2Cards])

    useEffect(() => {
        if (updatedCell && boardCells && choiceCard) {
            dispatch(updateBoardCells(choiceCard, updatedCell, boardCells))
            setUpdatedCell(undefined)
            setSteps(prevState => prevState + 1)
            setChoiceCard(null)
        }
    }, [updatedCell])

    useEffect(() => {
        if (steps === 9 && boardCells && player1 && player2) {
            const [count1, count2] = counterWin(boardCells, player1, player2)
            if (count1 > count2) {
                dispatch(setWinner(1))
                alert('win')
            } else if (count1 < count2) {
                dispatch(setWinner(2))
                alert('LOSE')
            } else {
                dispatch(setWinner(0))
                alert('DRAW')
            }
            dispatch(onFinished(true))
            history.push('/game/finish')
        }
    }, [steps])

    const handleClickBoardCell = async (position: number) => {
        if (choiceCard) {
            setUpdatedCell(position)
            if (choiceCard.player === 1) {
                setPlayer1(prevState => prevState?.filter(item => item.id !== choiceCard.id))
            }

            if (choiceCard.player === 2) {
                setPlayer2(prevState => prevState?.filter(item => item.id !== choiceCard.id))
            }
            if (activePlayer === 1) {
                setActivePlayer(2)
            } else {
                setActivePlayer(1)
            }
        }
    }

    if (pokemons?.length === 0 || !pokemons) {
        history.replace('/game')
    }

    return (
        <div className={classes.root}>
            <div className={classes.playerOne}>
                {player1 &&
                <PlayerBoard
                    player={1}
                    cards={player1}
                    onClickCard={(card) => setChoiceCard(card)}
                    activePlayer={activePlayer}
                /> }
            </div>
            <div className={classes.board}>
                {
                    boardCells?.map(({position, card}) => (
                        <div
                            key={position}
                            className={classes.boardPlate}
                            onClick={() => !card && handleClickBoardCell(position)}
                        >
                            {card && <PokemonCard className={classes.card} {...card} isActive minimize />}
                        </div>
                    ))
                }
            </div>
            <div className={classes.playerTwo}>
                {player2 &&
                <PlayerBoard
                    player={2}
                    cards={player2}
                    onClickCard={(card) => setChoiceCard(card)}
                    activePlayer={activePlayer}
                />}
            </div>
        </div>
    )
}