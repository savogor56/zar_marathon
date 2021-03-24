import classes from './style.module.css'

import React, {useContext} from "react"
import {PokemonContext} from "../../../context/pokemonContext";
import {PokemonCard} from "../../../components/PokemonCard";
import {Pokemon} from "../../../utils/types";

export const BoardPage = () => {
    const pokemonsContext = useContext(PokemonContext)
    const pokemons: [string, Pokemon][] | null = pokemonsContext && pokemonsContext.pokemons.length > 0 ? pokemonsContext.pokemons : null
    return (
        <div className={classes.root}>
            <div className={classes.playerOne}>
                {pokemons?.map(([key, item]) => (
                    <PokemonCard
                        key={key}
                        name={item.name}
                        img={item.img}
                        id={item.id}
                        type={item.type}
                        values={item.values}
                        isActive={true}
                        className={classes.card}
                        minimize={true}
                    />
                ))}
            </div>
            <div className={classes.board}>
                <div className={classes.boardPlate}>1</div>
                <div className={classes.boardPlate}>2</div>
                <div className={classes.boardPlate}>3</div>
                <div className={classes.boardPlate}>4</div>
                <div className={classes.boardPlate}>5</div>
                <div className={classes.boardPlate}>6</div>
                <div className={classes.boardPlate}>7</div>
                <div className={classes.boardPlate}>8</div>
                <div className={classes.boardPlate}>9</div>
            </div>
        </div>
    )
}