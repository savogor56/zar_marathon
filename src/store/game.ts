import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {Pokemon} from "../utils/types";
import {AppDispatch, RootState} from "./index";
import firebase from "../services/firebase";
import {selectLocalID} from "../utils/selectors";

const game = createSlice({
    name: 'game',
    initialState: {
        data: null as null | [string, Pokemon][],
        isFetching: false,
        selectedPokemons: [] as [string, Pokemon][],
        player2Cards: null as null | Pokemon[]
    },
    reducers: {
        pokemonsIsFetching: state => ({
            ...state,
            isFetching: true
        }),
        fetchPokemonsResolve: (state, {payload}: PayloadAction<[string, Pokemon][]>) => ({
            ...state,
            isFetching: false,
            data: payload
        }),
        onPokemonSelect: (state, {payload}: PayloadAction<[string, Pokemon]>) => {
            const [key] = payload
            const exist = state.selectedPokemons.find(item => item[0] === key)
            if (exist) {
               return ({
                   ...state,
                   selectedPokemons: state.selectedPokemons.filter(item => item[0] !== key)
               })
            } else {
                return ({
                    ...state,
                    selectedPokemons: [...state.selectedPokemons, payload]
                })
            }
        },
        setPlayer2Cards: (state, {payload}: PayloadAction<Pokemon[]>) => ({
            ...state,
            player2Cards: payload
        }),
        onClearPokemons: state => ({
            ...state,
            player2Cards: null,
            selectedPokemons: []
        })
    }
})

export default game.reducer

export const {pokemonsIsFetching, fetchPokemonsResolve,
    onPokemonSelect, onClearPokemons, setPlayer2Cards} = game.actions

export const fetchPokemons = () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const localId = selectLocalID(getState())
    dispatch(pokemonsIsFetching())
    const data = await fetch(`https://pokemon-game-93771-default-rtdb.firebaseio.com/${localId}/pokemons.json`)
        .then(res => res.json())
    console.log(data)
    dispatch(fetchPokemonsResolve(Object.entries(data)))

}

export const fetchPlayer2Pokemons = () => async (dispatch: AppDispatch) => {
    const res = await fetch('https://reactmarathon-api.netlify.app/api/create-player')
    const req = await res.json()
    const player2 = req.data
    dispatch(setPlayer2Cards(player2))
}

export const addPokemon = (pokemon: Pokemon) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const localId = selectLocalID(getState())
    if (localId) await firebase.addPokemon(pokemon, localId)
}