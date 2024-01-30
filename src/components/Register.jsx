import React, { useState } from 'react'
import './css/Register.css'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import hide from '../assets/hide.png'
import view from '../assets/view.png'

const Register = () => {

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [isText, setText] = useState(false)

    const handleFormData = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData, [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { name, username, email, password } = formData

        const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, username, email, password
            })
        })

        const data = await res.json()

        if (res.status === 200) {
            toast.success(data.msg)
            navigate('/signin')
        }
        else {
            toast.error(data.msg)
        }
    }   

    const handleSeePass = ()=>{
        setText(!isText)
    }


    return (
        <div className="register-container">
            <div className='register-card'>
                <form method="POST" className='register-right' autoComplete='off'>
                    <p>Sign Up</p>
                    <input type="text" name="name" value={formData.name} placeholder="name" autoComplete="off" auto
                        onChange={handleFormData}
                    />
                    <input type="text" name="username" value={formData.username} placeholder="username" autoComplete="off"
                        onChange={handleFormData}
                    />
                    <input type="email" name="email" value={formData.email} placeholder="e-mail" autoComplete="off"
                        onChange={handleFormData}
                    />
                    <div className='symbol'>
                        <input type={isText?"text":"password"} name="password" id='login-password' value={formData.password} placeholder="password" autoComplete="off"
                            onChange={handleFormData}
                        />
                        <img src={isText?hide:view} onClick={handleSeePass} alt='register-img'/>
                    </div>
                    <input type="submit" className='submit' placeholder="Submit"
                        onClick={handleSubmit} />
                </form>
            </div>
        </div>
    )
}

export default Register
