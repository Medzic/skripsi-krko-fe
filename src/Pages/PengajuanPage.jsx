import React from 'react'
import NavigationBar from '../Component/NavigationBar'
import ButtonTambahPengajuan from '../Component/ButtonTambahPengajuan';
import './PengajuanPage.css'
import TabelPengajuan from '../Component/TabelPengajuan';
import { TokenFalseRedirect } from './TokenRedirect';

const PengajuanPage = () => {

  return (
    <>
    <TokenFalseRedirect/>
    <NavigationBar/>
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