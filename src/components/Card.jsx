import React, { useEffect, useState } from 'react'
import './css/Card.css'
import placeholder from '../assets/placeholder.jpg'
import { NavLink } from 'react-router-dom'
import { format } from 'timeago.js'

const Card = ({ video }) => {
	const [creator, setCreator] = useState({})
	useEffect(() => {
		try {
			const getCreator = async () => {
				const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/user/find/${video.userId}`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json"
					},
					credentials: "include"
				})
				const data = await res.json()
				setCreator(data.data)
			}
			getCreator()
		} catch (e) {
			console.log(e.message)
		}
	}, [video])
	return (
		<div className='card'>
			<NavLink to={`/video/${video._id}`} style={{ "textDecoration": "none" }}>
				<div className='thumbnail'>
					<img src={video.imgUrl} alt={video.title} loading='lazy'/>
				</div>
			</NavLink>
			<div className='desc-container'>
				<NavLink to={`/user/${creator._id}`}>
					{
						creator.img ? (<img src={creator.img} className='profile-img' alt='profile image' loading='lazy'/>) : (<img src={placeholder} alt='placeholder profile image' className='profile-img' loading='lazy'/>)
					}
				</NavLink>
				<div className='desc'>
					<span className='title'>{video.title}</span>
					<div className='watch-details'>
						<span className='views'>{video.views} views &nbsp; </span>
						<span className='time'>{format(video.createdAt)}</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Card
