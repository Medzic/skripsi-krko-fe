import React from 'react'
import { TokenFalseRedirect } from './TokenRedirect';
import ConditionBar from './ConditionBar';

const NotFoundPage = () => {

  return (
    <>
    <TokenFalseRedirect/>
    <ConditionBar/>
    <h1>halaman tidak ditemukan</h1>
    </>
  )
}

export default NotFoundPage