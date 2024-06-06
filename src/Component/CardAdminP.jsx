import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './CardAdmin.css'

const CardAdminP = () => {
    const navigate = useNavigate();
    const backendUrl = process.env.REACT_APP_ENDPOINT

    const [data, setData] = useState([]);

    const fetchAllData = async () => {
      try {
        // ambil token dari cookie
        const token = document.cookie.replace(/(?:^|.*;\s*)token\s*=\s*([^;]*).*$|^.*$/, "$1");
        //set cookie as header
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        const response = await axios.get(`${backendUrl}/admin/getaccpengajuan`, config)
        setData(response.data);
  
      } catch (error) {
        console.log(error);
      }
    }
    const filteredData = data
    .flatMap(user => user.Pengajuans) 
    .filter(pengajuan => 
      pengajuan.Lokasi !== null && 
      pengajuan.Filestorages.length > 0 && 
      pengajuan.noreg === null && 
      pengajuan.notes === null
    );
  
    useEffect(() => {
      fetchAllData();
    }, [])
    return (

        <button onClick={() => navigate('/pengajuan-proses')} className='cardadmin-p'>
            <h1>Di Proses</h1>
            <h1>{filteredData.length }</h1>
        </button>

    )
}

export default CardAdminP