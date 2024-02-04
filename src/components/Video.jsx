import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setVideoInfo, setRelatedVideo, setUserInfo, setCommentList } from '../redux/slices/playVideoSlice'
import { setUser, startLoading, stopLoading } from '../redux/slices/userSlice'
import './css/Video.css'
import RelatedCard from './RelatedCard'
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { IoMdShareAlt } from "react-icons/io";
import { AiFillLike } from "react-icons/ai";
import { IoMdSend } from "react-icons/io";
import { format } from 'timeago.js'
import CommentCard from './CommentCard'
import Loading from './Loading'

const Video = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { videoInfo, relatedVideoList, userInfo, commentList } = useSelector((state) => {
        return state.single
    })
    const { userInfoNav, logged, loading } = useSelector((state) => {
        return state.user
    })
    const [comment, setComment] = useState("")
    const [commentUpdate, setCommentUpdate] = useState({})

    const handleLike = async () => {
        const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/user/like/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
        const data = await res.json()
        dispatch(setVideoInfo(data.data))
        dispatch(stopLoading())
    }
    const handleDislike = async () => {
        const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/user/unlike/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
        const data = await res.json()
        dispatch(setVideoInfo(data.data))
    }

    const handleSubscribe = async () => {
        const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/user/sub/${videoInfo.userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
        const data = await res.json()
        dispatch(setUser(data.data))
    }

    const handleUnsubscribe = async () => {
        const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/user/unsub/${videoInfo.userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
        const data = await res.json()
        dispatch(setUser(data.data))
    }

    const handleComment = async (e) => {
        e.preventDefault();
        const [commentRes] = await Promise.all([
            fetch(`${process.env.REACT_APP_BASE_URL}/api/comment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    desc: comment,
                    videoId: id
                }),
                credentials: "include"
            })
        ])
        const [commentData] = await Promise.all([
            commentRes.json(),
        ]);
        setCommentUpdate(commentData)
    }

    const handleDisabled = () => {
        navigate('/signin')
    }

    useEffect(() => {
        const fetchData = async () => {
            dispatch(startLoading())
            const [videoRes, relatedVideoRes, viewsRes] = await Promise.all([
                fetch(`${process.env.REACT_APP_BASE_URL}/api/video/find/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include"
                }),
                fetch(`${process.env.REACT_APP_BASE_URL}/api/video/random`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include"
                }),
                fetch(`${process.env.REACT_APP_BASE_URL}/api/video/views/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include"
                }),
            ])

            const [videoData, relatedVideoData, viewsData] = await Promise.all([
                videoRes.json(),
                relatedVideoRes.json(),
                viewsRes.json(),
            ])

            dispatch(setVideoInfo(videoData.data));
            dispatch(setRelatedVideo(relatedVideoData.data));

            if (videoData.data.userId) {
                const userRes = await fetch(`${process.env.REACT_APP_BASE_URL}/api/user/find/${videoData.data.userId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include"
                })
                const userData = await userRes.json()
                dispatch(setUserInfo(userData.data))
            }
            dispatch(stopLoading())
        }
        fetchData()
    }, [id])

    useEffect(() => {
        const fetchComment = async () => {
            const [commentRes] = await Promise.all([
                fetch(`${process.env.REACT_APP_BASE_URL}/api/comment/find/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include"
                })
            ])

            const [commentData] = await Promise.all([
                commentRes.json()
            ])
            const data = commentData.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            dispatch(setCommentList(data))
        }
        fetchComment()
    }, [commentUpdate])

    return (

        <div>
            {
                loading ? (<Loading />) : (
                    <div className='single-video'>
                        <div className='video-content'>
                            {
                                videoInfo.videoUrl && <video controls autoPlay controlsList='nodownload' className='video-player' key={videoInfo._id}>
                                    <source src={videoInfo.videoUrl} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            }
                            <div><span className='video-title'>{videoInfo.title}</span></div>
                            <div className='video-utilities'>
                                <div className='sub-container'>
                                    <div className='sub-subcontainer'>
                                        <div className='sub-image'><img src={userInfo.img} /></div>
                                        <div className='sub-detail'>
                                            <span className='username'>{userInfo.username}</span>
                                            <span className='sub-count'>{userInfo.subscribers} subscribers</span>
                                        </div>
                                    </div>
                                    {
                                        logged ? (
                                            userInfo._id === userInfoNav._id ? ("") : (
                                                userInfoNav.subscribedUsers ? (userInfoNav.subscribedUsers.includes(videoInfo.userId) ? (<button className='unsubscribe' onClick={handleUnsubscribe}>Subscribed</button>) : <button className='subscribe' onClick={handleSubscribe}>Subscribe</button>) : (<button className='subscribe' onClick={handleSubscribe}>Subscribe</button>)
                                            )
                                        ) : (
                                            <button className='subscribe' onClick={handleDisabled}>Subscribe</button>
                                        )
                                    }
                                </div>
                                <div className='like-container'>
                                    <div className='like'>
                                        {
                                            logged ? (
                                                <div style={{ "display": "flex", "alignItems": "center", "cursor": "pointer" }} onClick={handleLike}>{
                                                    videoInfo.likes ? (videoInfo.likes.includes(userInfoNav._id) ? (<AiFillLike size={24} />) : (<AiOutlineLike size={24} />)) : (<AiOutlineLike size={24} />)
                                                }</div>
                                            ) : (
                                                <div style={{ "display": "flex", "alignItems": "center", "cursor": "pointer" }} onClick={handleDisabled}>{
                                                    (<AiOutlineLike size={24} />)
                                                }</div>
                                            )
                                        }
                                        <span>{videoInfo.likes ? videoInfo.likes.length : 0}</span>
                                    </div>
                                    <div className='like'>
                                        {
                                            logged ? (
                                                <div style={{ "display": "flex", "alignItems": "center", "cursor": "pointer" }} onClick={handleDislike}>{
                                                    videoInfo.dislikes ? (videoInfo.dislikes.includes(userInfoNav._id) ? (<AiFillDislike size={24} />) : (<AiOutlineDislike size={24} />)) : (<AiOutlineDislike size={24} />)
                                                }</div>
                                            ) : (
                                                <div style={{ "display": "flex", "alignItems": "center", "cursor": "pointer" }} onClick={handleDisabled}>{
                                                    (<AiOutlineDislike size={24} />)
                                                }</div>

                                            )
                                        }
                                        <span>{videoInfo.dislikes ? videoInfo.dislikes.length : 0}</span>
                                    </div>
                                    <div className='like'><IoMdShareAlt size={24} /></div>
                                </div>
                            </div>
                            <div className='vid-desc'>
                                <div className='view-detail'>
                                    <span>{videoInfo.views} views</span>
                                    <span>{format(videoInfo.createdAt)}</span>
                                </div>
                                <span className='descript'>{videoInfo.description}</span>
                            </div>
                            <div className='comment'>
                                {
                                    logged ? (
                                        <form className='comment-form'>
                                            <input type='text' placeholder='your thoughts' autoComplete='off' name="comment" onChange={(e) => { setComment(e.target.value) }} />
                                            <button onClick={handleComment}>Post</button>
                                        </form>
                                    ) : (
                                        <form className='comment-form' >
                                            <input type='text' placeholder='your thoughts' autoComplete='off' name="comment" />
                                            <button onClick={handleDisabled}>Post</button>
                                        </form>
                                    )
                                }
                                <div className='comment-container' key={videoInfo._id}>
                                    {
                                        commentList && commentList.map((comment) => {
                                            return <CommentCard comment={comment} key={comment._id}/>
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='related-video'>
                            {
                                relatedVideoList.map((video) => {
                                    return (
                                        <RelatedCard video={video} key={video._id} />
                                    )
                                })
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Video
