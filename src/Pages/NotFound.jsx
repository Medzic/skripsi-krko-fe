import React, { useEffect } from 'react'
import NavigationBar from '../Component/NavigationBar'
import Cookies from 'js-cookie';

const NotFound = () => {

  useEffect(() => {
    const token = Cookies.get('token');

    if(!token) return window.location.href = '/Auth'
  }, [])

  return (
    <>
    <NavigationBar/>
    <h1>halaman tidak ditemukan</h1>
    </>
  )
}

export default NotFound