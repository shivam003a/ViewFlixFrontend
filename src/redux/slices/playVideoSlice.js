import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    videoInfo: {},
    relatedVideoList: [],
    userInfo: {},
    commentList: []
}
const playVideoSlice = createSlice({
    name: "singleVideo",
    initialState,
    reducers: {
        setVideoInfo: (state, action)=>{
            state.videoInfo = action.payload
        },
        setRelatedVideo: (state, action)=>{
            state.relatedVideoList = action.payload
        },
        setUserInfo: (state, action)=>{
            state.userInfo = action.payload
        },
        setCommentList: (state, action)=>{
            state.commentList = action.payload
        }
    }
})

export const {setVideoInfo, setRelatedVideo, setUserInfo, setCommentList} = playVideoSlice.actions
export default playVideoSlice.reducer