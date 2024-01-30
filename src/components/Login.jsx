import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { startLoading, stopLoading, setUser, setLoggedIn, setLoggedOut } from '../redux/slices/userSlice'
import './css/Login.css'
import { toast } from 'react-hot-toast';
import hide from '../assets/hide.png'
import view from '../assets/view.png'

const Login = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isText, setText] = useState(false)
    const { loading } = useSelector((state) => {
        return state.user
    })

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleFormData = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData, [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(startLoading())

        const { email, password } = formData
        const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/auth/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        })

        const data = await res.json()

        if (res.status === 200) {
            toast.success(data.msg)
            dispatch(setUser(data.data))
            dispatch(setLoggedIn())
            navigate('/')
        }
        else {
            toast.error(data.msg)
            dispatch(setLoggedOut())
        }
        dispatch(stopLoading())
    }
    const handleSeePass = () => {
        setText(!isText)
    }

    return (
        <div className="login-container">
            <div className='login-card'>
                <form method="POST" className='login-right'>
                    <p>Sign In</p>
                    <input type="email" name="email" value={formData.email} placeholder="e-mail" autoComplete="off"
                        onChange={handleFormData}
                    />
                    <div className='symbol'>
                        <input type={isText ? "text" : "password"} name="password" id='login-password' value={formData.password} placeholder="password" autoComplete="off"
                            onChange={handleFormData}
                        />
                        <img src={isText ? hide : view} onClick={handleSeePass} alt='login-img' />
                    </div>
                    {
                        loading ? (<button className='submit' placeholder="Submit"
                            onClick={handleSubmit} disabled><div className='spinner' /></button>) : (
                            <button className='submit' placeholder="Submit"
                                onClick={handleSubmit}>Submit</button>
                        )
                    }

                </form>
            </div>
        </div>
    )
}

export default Login
