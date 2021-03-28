import {useContext, useEffect, useState} from "react"
import {Route, Switch, useRouteMatch} from "react-router"

import {StartPage} from "./Start"
import {BoardPage} from "./Board"
import {FinishPage} from "./Finish"

import {PokemonContext} from "../../context/pokemonContext"
import {Pokemon} from "../../utils/types";

export const GamePage = () => {
    const [selectedPokemons, setSelectedPokemons] = useState<[string, Pokemon][] | []>([])
    const [player1Cards,setPlayer1Cards] = useState<Pokemon[] | undefined>()
    const [player2Cards,setPlayer2Cards] = useState<Pokemon[] | undefined>()
    const [isFinished, setIsFinished] = useState(false)
    const [winner, setWinner] = useState(0)
    const match = useRouteMatch()

    const handleSelected = (key: string, pokemon: Pokemon) => {
        setSelectedPokemons(prevState => {
            if (prevState) {
                const exist = prevState.find((item) => item[0] === key)
                if (exist) {
                    return [...prevState.filter(item => item[0] !== key)]
                } else {
                    return [
                        ...prevState,
                        [key, pokemon]
                    ]
                }
            }
            return [[key, pokemon]]
        })
    }

    const handleSetPlayersCards = (player1Cards: Pokemon[] | undefined, player2Cards: Pokemon[] | undefined) => {
        setPlayer1Cards(player1Cards)
        setPlayer2Cards(player2Cards)
    }

    const handleFinished = (isFinished: boolean) => {
        setIsFinished(isFinished)
    }

    const handleSetWinner = (winner: number) => {
        setWinner(winner)
    }

    const handleClear = () => {
        setPlayer2Cards(undefined)
        setPlayer1Cards(undefined)
        setWinner(0)
        setIsFinished(false)
        setSelectedPokemons([])
    }

    return (
        <PokemonContext.Provider value={{
            pokemons: selectedPokemons,
            onSelected: handleSelected,
            player1: player1Cards,
            player2: player2Cards,
            onSetPlayersCards: handleSetPlayersCards,
            onFinished: handleFinished,
            isFinished,
            winner,
            onSetWinner: handleSetWinner,
            onClear: handleClear
        }}>
            <Switch>
                <Route path={`${match.path}/`} exact>
                    <StartPage />
                </Route>
                <Route path={`${match.path}/board`}>
                    <BoardPage />
                </Route>
                <Route path={`${match.path}/finish`}>
                    <FinishPage />
                </Route>
            </Switch>
         </PokemonContext.Provider>
    );
};