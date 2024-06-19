import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Card.css'

const CardP = () => {
    const [data, setData] = useState([]);
    const backendUrl = process.env.REACT_APP_ENDPOINT

    const navigate = useNavigate();

    const fetchPengajuan = async () => {
        try {
            // ambil token dari cookie
            const token = document.cookie.replace(/(?:^|.*;\s*)token\s*=\s*([^;]*).*$|^.*$/, "$1");
            //set cookie as header
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const response = await axios.get(`${backendUrl}/pengajuan`, config)
            setData(response.data);

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchPengajuan();
    }, [])

    return (

        <button onClick={() => navigate('/Pengajuan-DiProses')} className='buttonP '>
            <h1>Di Proses</h1>
            <h1>{data.filter(pengajuan => pengajuan.picked === false && pengajuan.notes === null && pengajuan.Lokasi !== null && pengajuan.Filestorages.length > 0).length}</h1>
        </button>

    )
}

export default CardP