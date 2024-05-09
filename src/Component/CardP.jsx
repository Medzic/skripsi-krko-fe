import React from 'react'
import './Card.css'
import { useNavigate } from 'react-router-dom'

const CardP = () => {
    const navigate = useNavigate();
    return (

        <button onClick={() => navigate('/Pengajuan-DiProses')} className='buttonP '>
            <h1>Di Proses</h1>
            <h1>0</h1>
        </button>

    )
}

export default CardP