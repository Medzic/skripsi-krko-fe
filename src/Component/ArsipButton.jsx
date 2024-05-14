import React from 'react'
import './ArsipButton.css'
import { useNavigate } from 'react-router-dom'

export const ArsipButton = () => {
  const navigate = useNavigate()
  return (

    <button onClick={() => navigate('/arsip')} className='arsip-button'>
      <h1>Arsip</h1>
    </button>

  )
}
