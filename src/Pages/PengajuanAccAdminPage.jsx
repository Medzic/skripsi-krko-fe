import React from 'react'
import { IsAdminToken, TokenFalseRedirect } from './TokenRedirect'
import ConditionBar from './ConditionBar'
import TabelPengajuanAccAdmin from '../Component/TabelPengajuanAccAdmin'

const PengajuanAccAdminPage = () => {
    return (
        <>
            <IsAdminToken />
            <TokenFalseRedirect />
            <ConditionBar />
            <div className="tabel-css">
                <TabelPengajuanAccAdmin/>
            </div>
        </>
    )
}

export default PengajuanAccAdminPage