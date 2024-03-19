import Cookies from 'js-cookie';
import React, { useEffect } from 'react'
import NavigationBar from '../Component/NavigationBar';

const Berkas = () => {
  useEffect(() => {
    const token = Cookies.get('token');

    if (!token) return window.location.href = '/Auth'
  }, [])

  return (

    <>
    <NavigationBar/>
      <div>
        Berkas
      </div>
    </>
  )
}

export default Berkas