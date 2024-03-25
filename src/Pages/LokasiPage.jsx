import React from 'react'
import NavigationBar from '../Component/NavigationBar'
import ButtonTambahPengajuan from '../Component/ButtonTambahPengajuan';
import TabelLokasi from '../Component/TabelLokasi';
import './PengajuanPage.css'
import { TokenFalseRedirect } from './TokenRedirect';

const LokasiPage = () => {

  return (
    <>
    <TokenFalseRedirect/>
    <NavigationBar/>
    <div className='button-css'>
      <ButtonTambahPengajuan/>
    </div>
    <div className="tabel-css">
      <TabelLokasi/>
    </div>
    </>
  )
}

export default LokasiPage