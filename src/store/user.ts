import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {AppDispatch} from "./index"
import {userData} from "../utils/types"

const user = createSlice({
    name: 'user',
    initialState: {
        isLoading: true,
        data: null as null | userData
    },
    reducers: {
        fetchUser: (state) => ({
            ...state,
            isLoading: true
        }),
        setUser: (state, {payload}: PayloadAction<any>) => ({
            isLoading: false,
            data: payload
        }),
        removeUser: () => ({
            isLoading: false,
            data: null
        })
    }
})

export default user.reducer

export const {removeUser, fetchUser, setUser} = user.actions

export const updateUserData = () => async (dispatch: AppDispatch) => {
    const idToken = localStorage.getItem('idToken')
    if (idToken) {
        // dispatch(fetchUser())
        const options = {
            method: 'POST',
            body: JSON.stringify({
                idToken
            })
        }

        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAYpaEzGNbFmxh8zKsZ31eUDKKOKUcMwvQ', options)
            .then(res => res.json())

        if (response.hasOwnProperty('error')) {
            localStorage.removeItem('idToken')
            dispatch(removeUser())
        } else {
            dispatch(setUser(response.users[0]))
        }
        console.log(response.users[0])
    } else {
        dispatch(removeUser())
    }
}

export const getUserData = () => (dispatch: AppDispatch) => {
    dispatch(fetchUser())
    dispatch(updateUserData())
}