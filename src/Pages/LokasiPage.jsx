import React from 'react'
import NavigationBar from '../Component/NavigationBar'
import TabelLokasi from '../Component/TabelLokasi';
import './PengajuanPage.css'
import { TokenFalseRedirect } from './TokenRedirect';
import ButtonTambahLokasi from '../Component/ButtonTambahLokasi';

const LokasiPage = () => {

  return (
    <>
    <TokenFalseRedirect/>
    <NavigationBar/>
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