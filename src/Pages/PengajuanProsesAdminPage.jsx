import React from 'react'
import { IsAdminToken, TokenFalseRedirect } from './TokenRedirect'
import ConditionBar from './ConditionBar'
import TabelPengajuanProsesAdmin from '../Component/TabelPengajuanProsesAdmin'
import './PengajuanPage.css'

const PengajuanProsesAdminPage = () => {
    return (
        <>
            <IsAdminToken />
            <TokenFalseRedirect />
            <ConditionBar />
            <div className="tabel-css">
                <h1>
                    <TabelPengajuanProsesAdmin />
                </h1>
            </div>
        </>
    )
}

export default PengajuanProsesAdminPage