import React, { useState } from 'react';
import {  Nav } from 'react-bootstrap'
import { AuthLogin } from './AuthLogin';
import { AuthRegister } from './AuthRegister';
import './Auth.css'

const Auth = () => {
  const [formType, setFormType] = useState('login');


  return (
    <div className='Auth-Wrapper'>
      <div className="Auth-Title">PUPR</div>
        <Nav className="Auth-Switch">
        <Nav.Link
            onClick={() => setFormType('login')}
            className={formType === 'login' ? 'active' : ''}
          >
            Masuk
          </Nav.Link>
          <Nav.Link
            onClick={() => setFormType('register')}
            className={formType === 'register' ? 'active' : ''}
          >
            Daftar
          </Nav.Link>
      </Nav>      
      <div className="Auth-Subtitle">Silahkan masukkan data diri anda</div>
      {/* call the component here */}
      <div className='form'>
        {formType === 'login' ? <AuthLogin /> : <AuthRegister />}
      </div>
    </div>
  );
};

export default Auth;