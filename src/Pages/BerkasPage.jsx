import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'
import React, { useEffect } from 'react'
import NavigationBar from '../Component/NavigationBar';
import TambahButton from '../Component/TambahButton';
import TabelPengajuan from '../Component/TabelPengajuan';

const BerkasPage = () => {
  
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

export default BerkasPage