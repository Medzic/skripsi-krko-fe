import React, { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import './Auth.css'
import { AtSign, KeyRound } from 'lucide-react'


export const AuthLogin = ({ onLogin, onError }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/login', {
                email: email,
                password: password
            });
            const { data } = response

            if (!data.token) {
                console.error('no token received')
            }
            Cookies.set('token', data.token, { expires: 1 / 24 })

            onLogin();
        } catch (error) {
            onError(error);
        }
    };


    return (
        <form  onSubmit={handleLogin}>
            <div className='form'>
                <AtSign/>
                <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    className='form-input'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <KeyRound/>
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    className='form-input'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button className='form-button' type="submit">Masuk</button>
        </form>


    )
}
