import React from 'react'
import './css/NoVideoFound.css'
import { NavLink } from 'react-router-dom'

const NoVideoFound = () => {
	return (
		<div className='no-video-wrapper'>
			<div className='no-video'>
				<span>No Video Found</span>
				<NavLink to="/" className="button">Explore!</NavLink>
			</div>
		</div>
	)
}

export default NoVideoFound
