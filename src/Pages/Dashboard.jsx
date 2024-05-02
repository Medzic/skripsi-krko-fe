import React from 'react'
import './Dashboard.css'
import CardR from '../Component/CardR'
import CardA from '../Component/CardA'
import CardP from '../Component/CardP'
import { ArsipButton } from '../Component/ArsipButton'
import { TokenFalseRedirect } from './TokenRedirect'
import ConditionBar from './ConditionBar'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {



  return (
    <>
      <TokenFalseRedirect />
      <ConditionBar />
      <div className='card-deck'>
        <CardA />
        <CardP />
        <CardR />
      </div>

      <div className='card-deck-arsip'>
        <ArsipButton />
      </div>

      <Outlet />
    </>
  )
}

export default Dashboard