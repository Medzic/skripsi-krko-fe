import React from 'react'
import Auth from '../Component/Auth'
import './AuthPage.css'
import Swal from 'sweetalert2'
import { TokenTrueRedirect } from './TokenRedirect'
import NavigationBarUn from '../Component/NavigationBarUn'
import CarouselArticle from '../Component/CarouselArticle'

const AuthPage = () => {



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
      <TokenTrueRedirect />
      <NavigationBarUn />
      <div className='title' >
        <h1 >Selamat datang di halaman KRK Online</h1>
      </div>
      <div className='auth-item' >
        <article >
          <CarouselArticle />
        </article>
        <auth >
          <Auth onError={handleError} />
        </auth>
      </div>
    </>

  )
}

export default AuthPage

