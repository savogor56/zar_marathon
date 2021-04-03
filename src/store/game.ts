import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {Pokemon} from "../utils/types";
import {AppDispatch} from "./index";
import firebase from "../services/firebase";

const game = createSlice({
    name: 'game',
    initialState: {
        data: null as null | [string, Pokemon][],
        isFetching: false,
        selectedPokemons: [] as [string, Pokemon][],
        player2Cards: null as null | Pokemon[]
    },
    reducers: {
        pokemonsIsFetching: state => {
            state.isFetching = true
        },
        fetchPokemonsResolve: (state, {payload}: PayloadAction<[string, Pokemon][]>) => {
            state.isFetching = false
            state.data = payload
        },
        onPokemonSelect: (state, {payload}: PayloadAction<[string, Pokemon]>) => {
            const [key] = payload
            const exist = state.selectedPokemons.find(item => item[0] === key)
            if (exist) {
               state.selectedPokemons = state.selectedPokemons.filter(item => item[0] !== key)
            } else {
                state.selectedPokemons.push(payload)
            }
        },
        setPlayer2Cards: (state, {payload}: PayloadAction<Pokemon[]>) => {
            state.player2Cards = payload
        },
        onClearPokemons: state => {
            state.player2Cards = null
            state.selectedPokemons = []
        }
    }
})

export default game.reducer

export const {pokemonsIsFetching, fetchPokemonsResolve,
    onPokemonSelect, onClearPokemons, setPlayer2Cards} = game.actions

export const fetchPokemons = () => async (dispatch: AppDispatch) => {
    dispatch(pokemonsIsFetching())
    const data = await firebase.getPokemonsOnce()
    dispatch(fetchPokemonsResolve(data))
}

export const fetchPlayer2Pokemons = () => async (dispatch: AppDispatch) => {
    const res = await fetch('https://reactmarathon-api.netlify.app/api/create-player')
    const req = await res.json()
    const player2 = req.data
    dispatch(setPlayer2Cards(player2))
}

export const addPokemon = (pokemon: Pokemon) => async () => {
    await firebase.addPokemon(pokemon)
}