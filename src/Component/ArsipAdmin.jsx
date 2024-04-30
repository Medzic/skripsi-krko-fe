import React from 'react'
import { useNavigate } from 'react-router-dom'
import './ArsipButton.css'

const ArsipAdmin = () => {
    const navigate = useNavigate()

    return (
        <button onClick={() => navigate('/Arsip-Administrator')} className='arsip-button'>
            <h1>Arsip</h1>
        </button>
    )
}

export default ArsipAdmin