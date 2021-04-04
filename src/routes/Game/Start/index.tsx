import { useEffect, useState} from 'react'
import { useHistory } from 'react-router'

import {Pokemon} from "../../../utils/types";
import {PokemonCard} from "../../../components/PokemonCard"
import {Loader} from "../../../components/Loader"

import {useAppDispatch, useAppSelector} from "../../../store/hooks"
import {fetchPokemons, onPokemonSelect} from "../../../store/game"

import classes from "./style.module.css"

export const StartPage = () => {
    const [pokemons, setPokemons] = useState<[string, Pokemon][] | null>(null)
    const dispatch = useAppDispatch()
    const {data, isFetching, selectedPokemons} = useAppSelector(state => state.game)
    const history = useHistory()

    useEffect(() => {
        dispatch(fetchPokemons())
    }, [dispatch])

    useEffect(() => {
        if (data) setPokemons(data)
    }, [data])


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

                            const newItem: [string, Pokemon] = [key, newPokemon]
                            return newItem
                        }
                        return item
                    })]
                )
            }
            return prevState
        })
        const pokemon = pokemons?.find(item => item[1].id === id)
        if (pokemon) {
            dispatch(onPokemonSelect(pokemon))
        }
    }

    const handleStart = () => {
        history.push('/game/board')
    }

    return (
        <div className={classes.root}>
            <button
                className={classes.btn}
                onClick={handleStart}
                disabled={selectedPokemons.length < 5}
            >
                Start
            </button>
            {isFetching && <Loader/>}
            <div className={classes.cardsGrid}>
                {
                    pokemons && pokemons.map(([key,item]) => (
                        <div className={classes.cardWrap} key={key}>
                            <PokemonCard
                                name={item.name}
                                img={item.img}
                                id={item.id}
                                type={item.type}
                                values={item.values}
                                isActive={true}
                                isSelected={item.isSelected === true}
                                changeSelected={() => {
                                    if ((selectedPokemons.length < 5) || item.isSelected === true) {
                                        handleSelected(item.id)
                                    }
                                }}
                                className={classes.card}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
