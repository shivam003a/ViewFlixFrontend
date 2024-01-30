import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    userInfoNav: {

    },
    loading: false,
    logged: false
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        startLoading: (state)=>{
            state.loading = true
        },
        setUser: (state, action)=>{
            state.userInfoNav = action.payload
        },
        stopLoading: (state)=>{
            state.loading = false
        },
        setLoggedIn: (state)=>{
            state.logged = true
        },
        setLoggedOut: (state)=>{
            state.logged = false
        }
    }
})

export const {startLoading, setUser, stopLoading, setLoggedIn, setLoggedOut} = userSlice.actions
export default userSlice.reducer