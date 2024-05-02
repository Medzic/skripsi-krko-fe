import React from 'react'
import { TokenFalseRedirect } from './TokenRedirect';
import ConditionBar from './ConditionBar';
import './NotFound.css'

const NotFoundPage = () => {

  return (
    <>
    <TokenFalseRedirect/>
    <ConditionBar/>
    <h1 >halaman tidak ditemukan gan</h1>
    </>
  )
}

export default NotFoundPage