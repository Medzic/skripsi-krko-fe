import React from 'react'
import './Card.css'
import { Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const CardAdminA = () => {
    return (
        <Nav>
            <NavLink to='/Pengajuan-Acc'>
                <button className='buttonA'>
                    <h1>Di Terima</h1>
                    <h1>0</h1>
                </button>
            </NavLink>
        </Nav>

    )
}

export default CardAdminA