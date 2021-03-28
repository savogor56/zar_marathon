import {createContext} from "react"
import {Pokemon} from "../utils/types"

export const PokemonContext = createContext< {
    pokemons: [string, Pokemon][] | []
    onSelected: (key: string, pokemon: Pokemon) => void
    player1?: Pokemon[]
    player2?: Pokemon[]
    onSetPlayersCards: (player1Cards: Pokemon[] | undefined, player2Cards: Pokemon[] | undefined) => void
    isFinished: boolean
    onFinished: (isFinished: boolean) => void
    winner: number
    onSetWinner: (winner: number) => void
    onClear: () => void
} | null>(null)