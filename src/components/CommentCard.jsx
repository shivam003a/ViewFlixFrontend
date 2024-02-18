import React, { useEffect, useState } from 'react'
import './css/CommentCard.css'
import { format } from 'timeago.js'
import placeholder from '../assets/placeholder.jpg'

const CommentCard = ({ comment }) => {
    const [user, setUser] = useState({})
    useEffect(() => {
        try {
            const fetchCommentUser = async () => {
                const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/user/find/${comment.userId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include"
                })
                const data = await res.json()
                setUser(data.data)
            }
            fetchCommentUser()
        } catch (e) {
            console.log(e.message)
        }
    }, [comment._id])

    return (
        <div className='cc'>
            <div className='cc-img'>
                {
                    user.img ? (<img src={user.img} alt='profile image'/>) : (<img src={placeholder} alt='placeholder profile'/>)
                }
            </div>
            <div className='cc-content'>
                <div className='cc-info'>
                    <span>
                        {
                            user.username ? (user.username) : ("user")
                        }
                    </span>
                    <span>
                        {
                            comment.createdAt ? (format(comment.createdAt)) : ("long time ago")
                        }
                    </span>
                </div>
                <div className='cc-desc'>
                    {comment.desc}
                </div>
            </div>
        </div>
    )
}

export default CommentCard
