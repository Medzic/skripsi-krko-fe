import React from 'react'
import NavigationBar from '../Component/NavigationBar';
import { TokenFalseRedirect } from './TokenRedirect';
import TabelBerkas from '../Component/TabelBerkas';
import ButtonTambahBerkas from '../Component/ButtonTambahBerkas';

const BerkasPage = () => {

  return (

    <>
    <TokenFalseRedirect/>
    <NavigationBar/>
    <div className='button-css'>
      <ButtonTambahBerkas/>
    </div>
    <div className="tabel-css">
      <TabelBerkas/>
    </div>
    </>
  )
}

export default BerkasPage