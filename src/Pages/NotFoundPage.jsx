import React from 'react'
import { TokenFalseRedirect } from './TokenRedirect';
import ConditionBar from './ConditionBar';
import './NotFound.css'
import NotFound from '../Component/NotFound';

const NotFoundPage = () => {

  return (
    <>
      <TokenFalseRedirect />
      <ConditionBar />
      <NotFound />
    </>
  )
}

export default NotFoundPage