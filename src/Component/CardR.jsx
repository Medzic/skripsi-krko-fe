import React from 'react'
import './Card.css'
import { useNavigate } from 'react-router-dom'

const CardR = () => {
    const navigate = useNavigate();
    return (

        <button onClick={() => navigate('/Pengajuan-Ditolak')} className='buttonR '>
            <h1>Di Tolak</h1>
            <h1>0</h1>
        </button>

    )
}

export default CardR