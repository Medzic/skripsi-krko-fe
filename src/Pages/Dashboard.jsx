import React from 'react'
import './Dashboard.css'
import CardR from '../Component/CardR'
import CardA from '../Component/CardA'
import CardP from '../Component/CardP'
import { ArsipButton } from '../Component/ArsipButton'
import NavigationBar from '../Component/NavigationBar'
import { TokenFalseRedirect } from './TokenRedirect'

const Dashboard = () => {



  return (
    <>
    <TokenFalseRedirect/>
      <NavigationBar />
      <div className='card-deck'>
        <CardA />
        <CardP />
        <CardR />
      </div>

      <div className='card-deck-arsip'>
        <ArsipButton />
      </div>
    </>
  )
}

export default Dashboard