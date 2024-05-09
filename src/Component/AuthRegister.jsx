import React, { useState } from 'react'
import axios from 'axios'
import './Auth.css'
import { AtSign, KeyRound, MapPin, Phone, User } from 'lucide-react';



export const AuthRegister = ({ onLogin, onError }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [telp, setTelp] = useState('');
  const [alamat, setAlamat] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/register', {
        nama: username,
        email: email,
        telp: telp,
        alamat: alamat,
        password: password
      });

      onLogin();
    } catch (error) {
      onError(error);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <div className='form'>
        <User />
        <input
          type='text'
          id='username'
          placeholder='Nama'
          className='form-input'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <AtSign />
        <input
          type="email"
          id="email"
          placeholder="Email"
          className='form-input'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Phone />
        <input
          type='number'
          id='telp'
          placeholder='Telepon'
          className='form-input'
          value={telp}
          onChange={(e) => setTelp(e.target.value)}
        />
        <MapPin/>
        <input
          type='text'
          id='alamat'
          placeholder='Alamat'
          className='form-input'
          value={alamat}
          onChange={(e) => setAlamat(e.target.value)}
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
      <button className='form-button' type="submit">Daftar</button>
    </form>
  )
}
