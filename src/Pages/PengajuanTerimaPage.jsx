import React from 'react'
import { TokenFalseRedirect } from './TokenRedirect'
import ConditionBar from './ConditionBar'
import TabelPengajuanTerima from '../Component/TabelPengajuanTerima'

const PengajuanTerimaPage = () => {
  return (
    <>
    <TokenFalseRedirect />
    <ConditionBar />
    <div className="tabel-css">
        <TabelPengajuanTerima />
    </div>
</>  )
}

export default PengajuanTerimaPage