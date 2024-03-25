import React from 'react'
import NavigationBar from '../Component/NavigationBar'
import { TokenFalseRedirect } from './TokenRedirect';

const NotFoundPage = () => {

  return (
    <>
    <TokenFalseRedirect/>
    <NavigationBar/>
    <h1>halaman tidak ditemukan</h1>
    </>
  )
}

export default NotFoundPage