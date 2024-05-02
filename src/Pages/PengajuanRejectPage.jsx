import React from 'react'
import { TokenFalseRedirect } from './TokenRedirect'
import ConditionBar from './ConditionBar'
import TabelPengajuanTolak from '../Component/TabelPengajuanTolak'
import './PengajuanPage.css'

const PengajuanRejectPage = () => {
    
    return (
        <>
            <TokenFalseRedirect />
            <ConditionBar />
            <div className="tabel-css">
                <TabelPengajuanTolak />
            </div>
        </>
    )
}

export default PengajuanRejectPage