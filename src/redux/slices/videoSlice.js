import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    videoList: [],
    loading: false
}

const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {
        startLoading: (state)=>{
            state.loading = true
        },
        setVideoList: (state, action)=>{
            state.videoList = action.payload
        },
        stopLoading: (state)=>{
            state.loading = false
        }
    }
})

export const {startLoading, stopLoading, setVideoList} = videoSlice.actions
export default videoSlice.reducer