import { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom'
import '../Styles/Login.css'
import axios from 'axios'
import { UserContext } from "../utils/userContext";


export const Login = () => {
    const [email, setEmail] = useState('');
    const [err, setErr] = useState('')
    const [password, setPassword] = useState('');
    const { setAuth } = useContext(UserContext)
    const navigate = useNavigate()

    const location = useLocation();
    const from = location.state?.from?.pathname || "/";


    const handlOnSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:4000/api/user/login', {
            email: email,
            password: password
        }).then((response) => {
            setAuth(response.data)
            setEmail('')
            setPassword('')
            navigate(from, { replace: true });
        }).catch((err) => {
            setErr(err?.response?.data?.message)
        })

    }



    return (
        <div className='Container'>
            <div className="Wrapform">
                <form onSubmit={(e) => { handlOnSubmit(e) }} className="form">
                    <span className="title">Sign In</span>
                    {err !== '' && <span className="err">{err}</span>}
                    <div className="Input email">
                        <input type="email" className="inputPlace" placeholder="Email" onKeyUp={(e) => { setEmail(e.target.value) }} />
                        <span className="Input-focus"></span>
                    </div>
                    <div className="Input">
                        <input type="password" className="inputPlace" placeholder="Password" onKeyUp={(e) => { setPassword(e.target.value) }} />
                        <span className="Input-focus"></span>
                    </div>
                    <div className="Button-container">
                        <button type="submit" className="submitButton">Login</button>
                    </div>

                </form>
            </div>
        </div>
    )
}