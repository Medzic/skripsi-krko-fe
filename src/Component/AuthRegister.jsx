import React, { useState } from 'react'
import'./Auth.css'



export const AuthRegister = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [telp, setTelp] = useState('');
  const [alamat, setAlamat] = useState('');

  return (
      <form >
        <input
          type='username'
          id='username'
          placeholder='Nama'
          className='form-input'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          id="email"
          placeholder="Email"
          className='form-input'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        
        <input
          type='telp'
          id='telp'
          placeholder='Telepon'
          className='form-input'
          value={telp}
          onChange={(e) => setTelp(e.target.value)}
        />
        <input
          type='alamat'
          id='alamat'
          placeholder='Alamat'
          className='form-input'
          value={alamat}
          onChange={(e) => setAlamat(e.target.value)}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className='form-input'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='form-button' type="submit">Daftar</button>
      </form>
  )
}
