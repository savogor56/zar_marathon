import React, {useContext, useEffect, useState} from 'react'
import { useHistory } from 'react-router'

import {Pokemon} from "../../../utils/types";
import {PokemonCard} from "../../../components/PokemonCard"

import {FireBaseContext} from "../../../context/firabaseContext"

import classes from "./style.module.css"
import {PokemonContext} from "../../../context/pokemonContext"

export const StartPage = () => {
    const firebase = useContext(FireBaseContext)
    const pokemonsContext = useContext(PokemonContext)
    const [pokemons, setPokemons] = useState<[string, Pokemon][] | null>(null)
    const history = useHistory()

    const handleEnd = () => {
        history.push('/')
    }

    useEffect(() => {
        firebase?.getPokemonsSocket((pokemons) => {
            setPokemons(pokemons)
        })
        return () => firebase?.offPokemonsSocket()
    }, [])


    const handleSelected = (id: number) => {
        setPokemons((prevState: [string, Pokemon][] | null ) => {
            if (prevState) {
                return ( [...prevState.map(item => {
                        const [key, pokemon] = item
                        if (pokemon.id === id) {
                            const newPokemon = {
                                ...pokemon,
                                isSelected: !pokemon.isSelected
                            }
                            pokemonsContext && pokemonsContext.onSelected(key, newPokemon)
                            const newItem: [string, Pokemon] = [key, newPokemon]
                            return newItem
                        }
                        return item
                    })]
                )
            }
            return prevState
        })
    }

    const handleStart = () => {
        history.push('/game/board')
    }

    return (
        <div>
            <button
                className={classes.btn}
                onClick={handleStart}
                disabled={pokemonsContext !== null && pokemonsContext.pokemons.length < 5}
            >
                Start
            </button>
            <div className={classes.flex}>
                {
                    pokemons && pokemons.map(([key,item]) => (
                        <PokemonCard
                            key={key}
                            name={item.name}
                            img={item.img}
                            id={item.id}
                            type={item.type}
                            values={item.values}
                            isActive={true}
                            isSelected={item.isSelected === true}
                            changeSelected={() => {
                                if (pokemonsContext && pokemonsContext.pokemons.length < 5 || item.isSelected === true) {
                                    handleSelected(item.id)
                                }
                            }}
                            className={classes.card}
                        />
                    ))
                }
            </div>
            <button className={classes.btn} onClick={handleEnd}>
                End Game
            </button>
        </div>
    )
}
