import React from 'react'
import './Card.css'
import { useNavigate } from 'react-router-dom'

const CardAdminP = () => {
    const navigate = useNavigate();
    return (

        <button onClick={() => navigate('/pengajuan-proses')} className='buttonP '>
            <h1>Di Proses</h1>
            <h1>0</h1>
        </button>

    )
}

export default CardAdminP