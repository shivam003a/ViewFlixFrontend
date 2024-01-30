import React from 'react'
import { NavLink } from 'react-router-dom'
import './css/NotAuthorized.css'

const NotAuthorized = () => {
  return (
    <div className='no-video-auth-wrapper'>
      <div className='no-video-auth'>
        <span>Login or Subscribe to Channels</span>
        <NavLink to="/signin" className="button">SignIn</NavLink>
      </div>
    </div>
  )
}

export default NotAuthorized
