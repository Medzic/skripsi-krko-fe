import React from 'react'
import ButtonTambahPengajuan from '../Component/ButtonTambahPengajuan';
import './PengajuanPage.css'
import TabelPengajuan from '../Component/TabelPengajuan';
import { TokenFalseRedirect } from './TokenRedirect';
import ConditionBar from './ConditionBar';

const PengajuanPage = () => {

  return (
    <>
    <TokenFalseRedirect/>
    <ConditionBar/>
    <div className='button-css'>
      <ButtonTambahPengajuan/>
    </div>
    <div className="tabel-css">
      <TabelPengajuan/>
    </div>
    </>
  )
}

export default PengajuanPage