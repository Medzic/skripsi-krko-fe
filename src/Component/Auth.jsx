import React, { useState } from 'react';
import { Nav } from 'react-bootstrap'
import { AuthLogin } from './AuthLogin';
import { AuthRegister } from './AuthRegister';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import './Auth.css'

const Auth = ({ onError }) => {
  const [formType, setFormType] = useState('login');

  const navigate = useNavigate();

  const handleLogin = () => {
    Swal.fire({
      icon: "success",
      title: "Anda Berhasil Login",
      showConfirmButton: false,
      timer: 3000
    });
    return navigate("/");
  }

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
        {formType === 'login' ? <AuthLogin onLogin={handleLogin} onError={onError} /> : <AuthRegister />}
      </div>
    </div>
  );
};

export default Auth;