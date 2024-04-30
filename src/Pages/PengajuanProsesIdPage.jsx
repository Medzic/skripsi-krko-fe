import React from 'react'
import { IsAdminToken, TokenFalseRedirect } from './TokenRedirect'
import ConditionBar from './ConditionBar'
import './PengajuanPage.css'

const PengajuanProsesIdPage = () => {
  return (
    <>
    <IsAdminToken/>
        <TokenFalseRedirect />
        <ConditionBar />
        <div className="tabel-css">
            <h1>
                tabel gan
            </h1>
        </div>
    </>
  )
}

export default PengajuanProsesIdPage