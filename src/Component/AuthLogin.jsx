import React, { useState } from 'react'
import './Auth.css'


export const AuthLogin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <form >
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
    )
}
