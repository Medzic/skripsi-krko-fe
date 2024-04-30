import React from 'react'
import { IsAdminToken, TokenFalseRedirect } from './TokenRedirect'
import ConditionBar from './ConditionBar'
import TabelPengajuanProses from '../Component/TabelPengajuanProses'
import './PengajuanPage.css'

const PengajuanProsesPage = () => {
    return (
        <>
        <IsAdminToken/>
            <TokenFalseRedirect />
            <ConditionBar />
            <div className="tabel-css">
                <h1>
                    <TabelPengajuanProses/>
                </h1>
            </div>
        </>
    )
}

export default PengajuanProsesPage