import React from 'react'
import NavigationBar from '../Component/NavigationBar';
import ButtonTambahPengajuan from '../Component/ButtonTambahPengajuan';
import { TokenFalseRedirect } from './TokenRedirect';
import TabelBerkas from '../Component/TabelBerkas';

const BerkasPage = () => {

  return (

    <>
    <TokenFalseRedirect/>
    <NavigationBar/>
    <div className='button-css'>
      <ButtonTambahPengajuan/>
    </div>
    <div className="tabel-css">
      <TabelBerkas/>
    </div>
    </>
  )
}

export default BerkasPage