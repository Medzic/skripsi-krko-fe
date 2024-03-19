import React, { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import './Auth.css'


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
            console.log(data);

            if (!data.token) {
                console.error('no token received')
            }
            Cookies.set('token', data.token, { expires: 1 / 24 })
            console.log('login sukse. Token: ', data.token);

            onLogin();
        } catch (error) {
            //undone
            onError(error);
        }
    };


    return (
        <>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    className='form-input'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    className='form-input'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className='form-button' type="submit">Masuk</button>
            </form>

        </>
    )
}
