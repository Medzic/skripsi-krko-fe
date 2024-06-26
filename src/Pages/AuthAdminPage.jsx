import React from 'react'
import './AuthPage.css'
import { TokenTrueRedirect } from './TokenRedirect'
import AuthAdmin from '../Component/AuthAdmin'
import NavigationBarUn from '../Component/NavigationBarUn'

const AuthAdminPage = () => {


  return (
    <>
      <TokenTrueRedirect />
      <NavigationBarUn />
      <div className='title' >
        <h1 >Selamat datang di halaman KRK Online</h1>
      </div>
      <div className='auth-item' >
        <auth >
          <AuthAdmin />
        </auth>
      </div>
    </>

  )
}

export default AuthAdminPage

