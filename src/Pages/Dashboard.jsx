import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'
import CardR from '../Component/CardR'
import CardA from '../Component/CardA'
import CardP from '../Component/CardP'
import { ArsipButton } from '../Component/ArsipButton'
import Cookies from 'js-cookie'
import NavigationBar from '../Component/NavigationBar'

const Dashboard = () => {

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
      <NavigationBar />
      <div className='card-deck'>
        <CardA />
        <CardP />
        <CardR />
      </div>

      <div className='card-deck-arsip'>
        <ArsipButton />
      </div>
    </>
  )
}

export default Dashboard