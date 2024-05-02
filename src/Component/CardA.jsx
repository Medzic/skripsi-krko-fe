import React from 'react'
import './Card.css'
import { useNavigate } from 'react-router-dom'

const CardA = () => {
    const navigate = useNavigate();
    return (

        <button onClick={() => navigate('/Pengajuan-Diterima')} className='buttonA'>
            <h1>Di Terima</h1>
            <h1>0</h1>
        </button>

    )
}

export default CardA