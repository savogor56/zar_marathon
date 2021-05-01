import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {BoardCell, Pokemon} from "../utils/types";
import {AppDispatch} from "./index";

const board = createSlice({
    name: 'board',
    initialState: {
        winner: 0,
        isFinished: false,
        boardCells: null as BoardCell[] | null
    },
    reducers: {
        onFinished: (state, {payload}: PayloadAction<boolean>) => ({
            ...state,
            isFinished: payload
        }),
        setWinner: (state, {payload}: PayloadAction<number>) => ({
            ...state,
            winner: payload
        }),
        setBoardCells: (state, {payload}: PayloadAction<BoardCell[]>) => ({
            ...state,
            boardCells: payload
        }),
        onClearBoard: state => ({
            ...state,
            winner: 0,
            isFinished: false,
            boardCells: null
        })
    }
})

export default board.reducer

export const {onFinished, setWinner, onClearBoard, setBoardCells} = board.actions

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