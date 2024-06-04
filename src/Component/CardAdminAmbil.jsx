import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const CardAdminAmbil = () => {
    const navigate = useNavigate();

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
            const response = await axios.get('http://localhost:3000/admin/getaccpengajuan', config)
            setData(response.data);

        } catch (error) {
            console.log(error);
        }
    }
    const filteredData = data
        .flatMap(user => user.Pengajuans)
        .filter(pengajuan =>
            pengajuan.noreg &&
            pengajuan.picked === false
        );

    useEffect(() => {
        fetchAllData();
    }, [])
    return (
        <button onClick={() => navigate('/pengajuan-ambil')} className='cardadmin-p'>
            <h1>Di Ambil</h1>
            <h1>{filteredData.length}</h1>
        </button>

    )
}

export default CardAdminAmbil