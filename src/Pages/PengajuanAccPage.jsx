import React from 'react'
import { IsAdminToken, TokenFalseRedirect } from './TokenRedirect'
import ConditionBar from './ConditionBar'
import TabelPengajuanAcc from '../Component/TabelPengajuanAcc'

const PengajuanAccPage = () => {
    return (
        <>
            <IsAdminToken />
            <TokenFalseRedirect />
            <ConditionBar />
            <div className="tabel-css">
                <TabelPengajuanAcc/>
            </div>
        </>
    )
}

export default PengajuanAccPage