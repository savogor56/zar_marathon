import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {LoginFormData} from "../utils/types"
// @ts-ignore
import { NotificationManager } from "react-notifications"
import {AppDispatch} from "./index";
import {getUserData, updateUserData} from "./user";

const auth = createSlice({
    name: 'auth',
    initialState: {
        isFetching: false
    },
    reducers: {
        setIsFetching: (state, {payload}: PayloadAction<boolean>) => ({
            ...state,
            isFetching: payload
        })
    }
})


export default auth.reducer

export const { setIsFetching } = auth.actions

export const getStarterPack = (localId: string, idToken: string) => async () => {
    const pokemonsStart = await fetch('https://reactmarathon-api.herokuapp.com/api/pokemons/starter')
        .then(res => res.json())
    for (const item of pokemonsStart.data) {
        await fetch(`https://pokemon-game-93771-default-rtdb.firebaseio.com/${localId}/pokemons.json?auth=${idToken}`,{
            method: 'POST',
            body: JSON.stringify(item)
        })
    }
}

export const LoginOrRegister = (isSignUp: boolean, loginData: LoginFormData) => async (dispatch: AppDispatch ) => {
    let successMsg: string
    let url: string
    const options = {
        method: 'POST',
        body: JSON.stringify({
            ...loginData,
            returnSecureToken: true
        })
    }

    if (isSignUp) {
        successMsg = 'You have successfully registered!'
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAYpaEzGNbFmxh8zKsZ31eUDKKOKUcMwvQ'
    } else {
        successMsg = 'You have successfully sign in!'
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAYpaEzGNbFmxh8zKsZ31eUDKKOKUcMwvQ'
    }

    const response = await fetch(url, options)
        .then(res => res.json())

    if (response.hasOwnProperty('error')) {
        NotificationManager.error(response.error.message, 'Error!')
        return false
    }



    localStorage.setItem('idToken', response.idToken)
    NotificationManager.success(successMsg)
    if (isSignUp) {
        dispatch(getStarterPack(response.localId, response.idToken))
        dispatch(getUserData())
    } else {
        dispatch(updateUserData())
    }

    return true
}
