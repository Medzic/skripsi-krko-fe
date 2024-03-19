import React, { useEffect } from 'react'
import NavigationBar from '../Component/NavigationBar'
import Cookies from 'js-cookie';

const Lokasi = () => {

  useEffect(() => {
    const token = Cookies.get('token');

    if(!token) return window.location.href = '/Auth'
  }, [])

  return (
    <>
    <NavigationBar/>
      <div>
        Lokasi
      </div>

    </>
  )
}

export default Lokasi