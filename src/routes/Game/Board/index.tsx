import classes from './style.module.css'

import React, {useContext, useEffect, useState} from "react"
import {PokemonContext} from "../../../context/pokemonContext"
import {PokemonCard} from "../../../components/PokemonCard"
import {BoardCell, Pokemon} from "../../../utils/types"
import {useHistory} from "react-router"
import {PlayerBoard} from "./component/PlayerBoard"

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
    const pokemonsContext = useContext(PokemonContext)
    const pokemons: Pokemon[] | null = pokemonsContext && pokemonsContext.pokemons.length > 0
        ? pokemonsContext.pokemons.map((item: [string, Pokemon]) => item[1])
        : null
    const [board, setBoard] = useState<BoardCell[] | undefined>()
    const [player1,setPlayer1] = useState<Pokemon[] | undefined>(() => pokemons?.map(item => ({
        ...item,
        possession: 'blue'
    })))
    const [player2,setPlayer2] = useState<Pokemon[] | undefined>()
    const [choiceCard,setChoiceCard] = useState<Pokemon | null>(null)
    const [steps, setSteps] = useState(0)
    const [activePlayer, setActivePlayer] = useState(1)

    const history = useHistory()

    useEffect(() => {
        const fetchData = async () => {
            const boardResponse = await fetch('https://reactmarathon-api.netlify.app/api/board')
            const boardRequest = await boardResponse.json()
            setBoard(boardRequest.data)

            const player2Response = await fetch('https://reactmarathon-api.netlify.app/api/create-player')
            const player2Request = await player2Response.json()
            const player2 = player2Request.data.map((item: Pokemon) => ({
                ...item,
                possession: 'red'
            }))
            setPlayer2(player2)
            return player2
        }
        fetchData().then((player2: Pokemon[]) => {
            player1 && player2 && pokemonsContext?.onSetPlayersCards(player1, player2)
        })
    }, [])

    useEffect(() => {
        if (steps === 9 && board && player1 && player2) {
            const [count1, count2] = counterWin(board, player1, player2)
            debugger
            if (count1 > count2) {
                pokemonsContext?.onSetWinner(1)
                alert('win')
            } else if (count1 < count2) {
                pokemonsContext?.onSetWinner(2)
                alert('LOSE')
            } else {
                pokemonsContext?.onSetWinner(0)
                alert('DRAW')
            }
            pokemonsContext?.onFinished(true)
            history.push('/game/finish')
        }
    }, [steps])

    const handleClickBoardCell = async (position: number) => {
        if (choiceCard) {
            const params = {
                position,
                card: choiceCard,
                board
            }

            const res = await fetch('https://reactmarathon-api.netlify.app/api/players-turn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            })

            const request = await res.json()


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
            setBoard(request.data)
            setSteps(prevState => prevState + 1)
            setChoiceCard(null)
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
                    board?.map(({position, card}) => (
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