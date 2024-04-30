import React from 'react'
import { TokenFalseRedirect } from './TokenRedirect'
import ConditionBar from './ConditionBar'
import './Dashboard.css'
import CardAdminP from '../Component/CardAdminP'
import CardAdminA from '../Component/CardAdminA'
import ArsipAdmin from '../Component/ArsipAdmin'

const DashboardAdmin = () => {
    return (
        <>
            <TokenFalseRedirect />
            <ConditionBar />
            <div className='card-deck'>
                <CardAdminP />
                <CardAdminA />
            </div>

            <div className='card-deck-arsip'>
                <ArsipAdmin />
            </div>
        </>
    )
}

export default DashboardAdmin