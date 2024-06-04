import React from 'react'
import { IsAdminToken, TokenFalseRedirect } from './TokenRedirect'
import ConditionBar from './ConditionBar'
import TabelPengajuanAmbilAdmin from '../Component/TabelPengajuanAmbilAdmin'

const PengajuanAmbilAdminPage = () => {
    return (
        <>
            <IsAdminToken />
            <TokenFalseRedirect />
            <ConditionBar />
            <div className="tabel-css">
                <TabelPengajuanAmbilAdmin />
            </div>
        </>
    )
}

export default PengajuanAmbilAdminPage