import React from 'react'
import './css/RelatedCard.css'
import { NavLink } from 'react-router-dom'
import { format } from 'timeago.js'

const RelatedCard = ({ video }) => {

	return (
		<NavLink to={`/video/${video._id}`} style={{ "textDecoration": "none" }}>
			<div className='rcard'>
				<div className='rthumbnail'>
					<img src={video.imgUrl} alt={video.title} loading='lazy'/>
				</div>
				<div className='rdesc-container'>
					<div className='desc'>
						<span className='rtitle'>{video.title}</span>
						<div className='rwatch-details'>
							<span className='views'>{video.views} views &nbsp; </span>
							<span className='time'>{format(video.createdAt)}</span>
						</div>
					</div>
				</div>
			</div>
		</NavLink>
	)
}

export default RelatedCard
