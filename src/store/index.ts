import {configureStore, combineReducers} from "@reduxjs/toolkit"
import game from "./game";

const rootReducer = combineReducers({
    game
})

const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store