import React, { useEffect } from 'react'
import NavigationBar from '../Component/NavigationBar'
import Cookies from 'js-cookie';
import TambahButton from '../Component/TambahButton';
import './PengajuanPage.css'
import PengajuanTabel from '../Component/PengajuanTabel';

const PengajuanPage = () => {

  useEffect(() => {
    const token = Cookies.get('token');

    if(!token) return window.location.href = '/Auth'
  }, [])

  return (
    <>
    <NavigationBar/>
    <div className='button-css'>
      <TambahButton/>
    </div>
    <div className="tabel-css">
      <PengajuanTabel/>
    </div>
    </>
  )
}

export default PengajuanPage