import React from 'react'
import { TokenFalseRedirect } from './TokenRedirect';
import TabelBerkas from '../Component/TabelBerkas';
import ButtonTambahBerkas from '../Component/ButtonTambahBerkas';
import ConditionBar from './ConditionBar';

const BerkasPage = () => {

  return (

    <>
    <TokenFalseRedirect/>
    <ConditionBar/>
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