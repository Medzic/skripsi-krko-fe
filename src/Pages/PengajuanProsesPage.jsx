import React from 'react'
import { TokenFalseRedirect } from './TokenRedirect'
import ConditionBar from './ConditionBar'
import './PengajuanPage.css'
import TabelPengajuanProses from '../Component/TabelPengajuanProses'

const PengajuanProsesPage = () => {
    return (
        <>
            <TokenFalseRedirect />
            <ConditionBar />
            <div className="tabel-css">
                <TabelPengajuanProses />
            </div>
        </>)
}

export default PengajuanProsesPage