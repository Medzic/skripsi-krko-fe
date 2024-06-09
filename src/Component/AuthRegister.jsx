import React, { useState } from 'react'
import axios from 'axios'
import './Auth.css'
import { AtSign, BookUser, KeyRound, MapPin, Phone, User } from 'lucide-react';
import Swal from 'sweetalert2'



export const AuthRegister = ({ onLogin, onError }) => {
  const backendUrl = process.env.REACT_APP_ENDPOINT

  const [email, setEmail] = useState('');
  const [nik, setNik] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [telp, setTelp] = useState('');
  const [alamat, setAlamat] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    Swal.fire({
      icon: 'info',
      title: 'Loading...',
      allowOutsideClick: false,
      showCancelButton: false,
      showConfirmButton: false
    });
    
    try {
      await axios.post(`${backendUrl}/register`, {
        nama: username,
        nik: nik,
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
        <BookUser />
        <input
          type='number'
          id='nik'
          placeholder='NIK'
          className='form-input'
          value={nik}
          onChange={(e) => setNik(e.target.value)}
        />
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
        <MapPin />
        <input
          type='text'
          id='alamat'
          placeholder='Alamat'
          className='form-input'
          value={alamat}
          onChange={(e) => setAlamat(e.target.value)}
        />
        <KeyRound />
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
