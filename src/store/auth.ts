import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {LoginFormData} from "../utils/types"
// @ts-ignore
import { NotificationManager } from "react-notifications"

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


export const signUp = (loginData: LoginFormData) => async () => {
    const options = {
        method: 'POST',
        body: JSON.stringify({
            ...loginData,
            returnSecureToken: true
        })
    }
    const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAYpaEzGNbFmxh8zKsZ31eUDKKOKUcMwvQ', options)
        .then(res => res.json())
    if (response.hasOwnProperty('error')) {
        NotificationManager.error(response.error.message, 'Error!')
    } else {
        localStorage.setItem('idToken', response.idToken)
        NotificationManager.success('You have successfully registered!')
    }
}

export const signIn = (loginData: LoginFormData) => async () => {
    const options = {
        method: 'POST',
        body: JSON.stringify({
            ...loginData,
            returnSecureToken: true
        })
    }
    const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAYpaEzGNbFmxh8zKsZ31eUDKKOKUcMwvQ', options)
        .then(res => res.json())
    if (response.hasOwnProperty('error')) {
        NotificationManager.error(response.error.message, 'Error!')
    } else {
        localStorage.setItem('idToken', response.idToken)
        NotificationManager.success('You have successfully sign in!')
    }
    console.log(response)
}
