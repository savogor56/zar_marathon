import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {BoardCell, Pokemon} from "../utils/types";
import {AppDispatch} from "./index";
import firebase from "../services/firebase";

const game = createSlice({
    name: 'game',
    initialState: {
        data: null as null | [string, Pokemon][],
        isFetching: false,
        selectedPokemons: [] as [string, Pokemon][],
        player2Cards: null as null | Pokemon[],
        winner: 0,
        isFinished: false,
        boardCells: null as BoardCell[] | null
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
        onFinished: (state, {payload}: PayloadAction<boolean>) => {
            state.isFinished = payload
        },
        setWinner: (state, {payload}: PayloadAction<number>) => {
            state.winner = payload
        },
        onClear: state => {
            state.winner = 0
            state.isFinished = false
            state.player2Cards = null
            state.selectedPokemons = []
        },
        setBoardCells: (state, {payload}: PayloadAction<BoardCell[]>) => {
            state.boardCells = payload
        }
    }
})

export default game.reducer

export const {pokemonsIsFetching, fetchPokemonsResolve,
    onPokemonSelect, setWinner, onFinished, onClear, setPlayer2Cards, setBoardCells} = game.actions

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

export const fetchBoardCells = () => async (dispatch: AppDispatch) => {
    const res = await fetch('https://reactmarathon-api.netlify.app/api/board')
    const req = await res.json()
    dispatch(setBoardCells(req.data))
}

export const updateBoardCells = (choiceCard: Pokemon, position: number, board: BoardCell[]) => async (dispatch: AppDispatch) => {
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

    const req = await res.json()
    dispatch(setBoardCells(req.data))
}

export const addPokemon = (pokemon: Pokemon) => async () => {
    await firebase.addPokemon(pokemon)
}