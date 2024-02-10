import React, { useEffect, useState } from 'react'
import './css/Search.css'
import { useSelector, useDispatch } from 'react-redux'
import { setSearchText } from '../redux/slices/searchSlice'
import { useNavigate } from 'react-router-dom'
import { FaUserCircle } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";


const Search = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [search, setSearch] = useState("")
	const { userInfoNav } = useSelector((state) => {
		return state.user
	})
	const [active, setActive] = useState(false)

	const handleInput = (e) => {
		setSearch(e.target.value)
	}
	const handleSearch = async (e) => {
		e.preventDefault()
		dispatch(setSearchText(search))
		navigate('/search')
		setActive(!active)
	}

	return (
		<div className='search-container'>
			<div className='logo-name'><NavLink to="/">ViewFlix</NavLink></div>
			<div className={active?("search-container1 active"):("search-container1")}>
				<input className="search-input" type='text' placeholder='search for videos' onChange={handleInput} value={search} />
				<button className='button' onClick={handleSearch}>Search</button>
			</div>
			<form className='edits'>
				<div className='search-icon' onClick={()=>{setActive(!active)}}><FaSearch size={22}/></div>
				<NavLink to="#">
					<FaVideo size={24} />
				</NavLink>
				{
					userInfoNav.img ? (<NavLink to="/"><img src={userInfoNav.img} className='nav-img' alt='user profile'/></NavLink>) : (
						<NavLink to="#"><FaUserCircle size={24} /></NavLink>)
				}
			</form>
		</div>
	)
}

export default Search
