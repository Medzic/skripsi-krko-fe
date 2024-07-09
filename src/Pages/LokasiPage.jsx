import React from 'react'
import TabelLokasi from '../Component/TabelLokasi';
import './PengajuanPage.css'
import { TokenFalseRedirect } from './TokenRedirect';
import ButtonTambahLokasi from '../Component/ButtonTambahLokasi';
import ConditionBar from './ConditionBar';
import ButtonPeta from '../Component/ButtonPeta';

const LokasiPage = () => {

  return (
    <>
    <TokenFalseRedirect/>
    <ConditionBar/>
    <div className='button-css'>
      <ButtonTambahLokasi/>
      <ButtonPeta/>
    </div>
    <div className="tabel-css">
      <TabelLokasi/>
    </div>
    </>
  )
}

export default LokasiPage