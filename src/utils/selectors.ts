import {RootState} from "../store"

export const selectUserLoading = (state: RootState) => state.user.isLoading
export const selectUser = (state: RootState) => state.user.data
export const selectLocalID = (state: RootState) => state.user.data?.localId