import React from 'react'
import './css/Navbar.css'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.jpg'
import { NavLink } from 'react-router-dom'
import { IoMdHome } from "react-icons/io";
import { MdSubscriptions } from "react-icons/md";
import { MdCloudUpload } from "react-icons/md";
import { RiLoginCircleFill } from "react-icons/ri";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { RiAddCircleFill } from "react-icons/ri";
import toast from 'react-hot-toast'
import { useEffect } from 'react';
import { startLoading, setUser, stopLoading, setLoggedIn, setLoggedOut } from '../redux/slices/userSlice'


const Navbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { logged } = useSelector((state) => {
        return state.user
    })

    const handleLogout = async () => {
        const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/auth/logout`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
        const data = await res.json()
        if (res.status === 200) {
            toast.success(data.msg)
            dispatch(setLoggedOut())
            dispatch(setUser({}))
        }
        else {
            toast.error(data.msg)
        }
        navigate('/')
    }

    useEffect(() => {
        const getUser = async () => {
            dispatch(startLoading())
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/user/me`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
            const data = await res.json()

            if (res.status === 200) {
                dispatch(setLoggedIn())
                dispatch(setUser(data.data))
                toast.success("fetching user details")
            }
            dispatch(stopLoading())
        }
        getUser()
    }, [])

    return (
        <>
            <div className='navigation-container'>
                <NavLink to='/'><img src={logo} alt='logo' className='logo-image' loading='lazy'/></NavLink>
                <NavLink to="/">
                    <IoMdHome size={22} />
                    <span>Home</span>
                </NavLink>
                <NavLink to="/subscribed">
                    <MdSubscriptions size={22} />
                    <span>Feed</span>
                </NavLink>
                {
                    logged && <NavLink to="/upload">
                        <MdCloudUpload size={22} />
                        <span>Upload</span>
                    </NavLink>
                }
                {
                    logged ? (
                        <div className='logout-button'><RiLogoutCircleRFill size={22} onClick={handleLogout} />
                            <span className='logout-text'>Logout</span></div>) : (
                        <NavLink to="/signin">
                            <RiLoginCircleFill size={22} />
                            <span>SignIn</span>
                        </NavLink>)
                }
                {
                    !logged && <NavLink to="/signup">
                        <RiAddCircleFill size={22} />
                        <span>SignUp</span>
                    </NavLink>
                }
            </div>
        </>
    )
}

export default Navbar
