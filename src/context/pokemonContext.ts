import {createContext} from "react"
import {Pokemon} from "../utils/types"

export const PokemonContext = createContext< {
    pokemons: [string, Pokemon][] | []
    onSelected: (key: string, pokemon: Pokemon) => void
} | null>(null)