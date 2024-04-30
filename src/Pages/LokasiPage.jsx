import React from 'react'
import TabelLokasi from '../Component/TabelLokasi';
import './PengajuanPage.css'
import { TokenFalseRedirect } from './TokenRedirect';
import ButtonTambahLokasi from '../Component/ButtonTambahLokasi';
import ConditionBar from './ConditionBar';

const LokasiPage = () => {

  return (
    <>
    <TokenFalseRedirect/>
    <ConditionBar/>
    <div className='button-css'>
      <ButtonTambahLokasi/>
    </div>
    <div className="tabel-css">
      <TabelLokasi/>
    </div>
    </>
  )
}

export default LokasiPage