import {useContext, useEffect, useState} from "react"
import {Route, Switch, useRouteMatch} from "react-router"

import {StartPage} from "./Start"
import {BoardPage} from "./Board"
import {FinishPage} from "./Finish"

import {PokemonContext} from "../../context/pokemonContext"
import {Pokemon} from "../../utils/types";

export const GamePage = () => {
    const [selectedPokemons, setSelectedPokemons] = useState<[string, Pokemon][] | []>([])
    console.log(selectedPokemons)
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

    return (
        <PokemonContext.Provider value={{
            pokemons: selectedPokemons,
            onSelected: handleSelected
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