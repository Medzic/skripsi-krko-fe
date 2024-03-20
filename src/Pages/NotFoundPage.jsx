import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import NavigationBar from '../Component/NavigationBar'
import Cookies from 'js-cookie';

const NotFoundPage = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const redirect = () => {
      navigate("/Auth")
    }
    const token = Cookies.get('token');

    if (!token) return redirect();

  }, [navigate])

  return (
    <>
    <NavigationBar/>
    <h1>halaman tidak ditemukan</h1>
    </>
  )
}

export default NotFoundPage