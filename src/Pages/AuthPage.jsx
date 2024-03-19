import React, { useEffect } from 'react'
import Auth from '../Component/Auth'
import './AuthPage.css'
import Cookies from 'js-cookie'
import NavigationBarUn from '../Component/NavigationBarUn'
import Swal from 'sweetalert2'

const AuthPage = () => {

  useEffect(() => {
    const token = Cookies.get('token');

    if (token) return window.location.href = '/';
  }, []
  )

  const handleError = (errorMessage) => {
    //modal from here
    if (errorMessage) {
      Swal.fire({
        title: 'Error!',
        text: errorMessage.response.data.error,
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#FF0000',
      })
    }
  }


  return (
    <>
      <NavigationBarUn />
      <div className='auth-container'>
        <div className='title '>
          <h1 >Selamat datang di halaman KRK Online</h1>
        </div>
        <div className='auth-item' >
          <div className='article'>
          </div>
          <div className="auth">
            <Auth onError={handleError} />
          </div>
        </div>
      </div>
    </>

  )
}

export default AuthPage

