import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Card.css'

const CardA = () => {
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

        <button onClick={() => navigate('/Pengajuan-Diterima')} className='buttonA'>
            <h1>Di Ambil</h1>
            <h1>{data.filter(pengajuan => pengajuan.picked === true && pengajuan.arsip === false).length}</h1>
        </button>

    )
}

export default CardA