import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import NavigationBar from '../Component/NavigationBar'
import Cookies from 'js-cookie';
import TambahButton from '../Component/TambahButton';
import './PengajuanPage.css'
import TabelPengajuan from '../Component/TabelPengajuan';

const PengajuanPage = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const redirect = () => {
      navigate("/Auth")
    }
    const token = Cookies.get('token');

    if (!token) return redirect();

  }, [navigate])

  return (
    <>
    <NavigationBar/>
    <div className='button-css'>
      <TambahButton/>
    </div>
    <div className="tabel-css">
      <TabelPengajuan/>
    </div>
    </>
  )
}

export default PengajuanPage