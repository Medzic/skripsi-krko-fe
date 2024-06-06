import React, { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import './Auth.css'
import { BookUser, KeyRound } from 'lucide-react'


export const AuthLogin = ({ onLogin, onError }) => {
    const backendUrl = process.env.REACT_APP_ENDPOINT

    const [nik, setNik] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${backendUrl}/login`, {
                nik: nik,
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
                <BookUser/>
                <input
                    type="number"
                    id="nik"
                    placeholder="NIK"
                    className='form-input'
                    value={nik}
                    onChange={(e) => setNik(e.target.value)}
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
