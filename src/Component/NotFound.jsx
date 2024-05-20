import React from 'react'
import notFoundImg from '../Asset/not-found.png'
import './NotFound.css'

const NotFound = () => {
  return (
    <div className='not-found-container'>
      <img src={notFoundImg} alt="Not Found" className='not-found' />
    </div>
  )
}

export default NotFound