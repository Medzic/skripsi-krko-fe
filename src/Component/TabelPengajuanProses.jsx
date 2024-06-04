import React, { useEffect, useState } from 'react'
import axios from 'axios'
import TabelPengajuanSkeleton from './Skeleton/TabelPengajuanSkeleton';
import './TabelPengajuan.css'
import ButtonLihatPengajuan from './ButtonLihatPengajuan';
import NotFound from './NotFound';

const TabelPengajuanProses = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);



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

            const response = await axios.get('http://localhost:3000/pengajuan', config)
            setData(response.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchPengajuan();
    }, [])
    return (
        <>
            {isLoading ? (
                <TabelPengajuanSkeleton />
            ) : data.filter(pengajuan => pengajuan.noreg === null && pengajuan.notes === null && pengajuan.Lokasi !== null && pengajuan.Filestorages.length > 0).length > 0 ? (
                <>
                    {data
                        .filter(pengajuan => pengajuan.noreg === null && pengajuan.notes === null && pengajuan.Lokasi !== null && pengajuan.Filestorages.length > 0)
                        .map((item, index) => (
                            <div key={index} className='card-user-container'>
                                <div className="print-container">
                                    <div className="header-proc-card">
                                        <h1>Pengajuan Diproses</h1>
                                    </div>

                                    <div className="item-container">
                                        <div className='card-user-item'>
                                            <h3>PId: {item.id}</h3>
                                            <h3>Pemohon: {item.namep1}</h3>
                                            <h3>No Registrasi: {item.noreg}</h3>
                                            <div>
                                                <h5>Catatan: </h5>
                                                <div className="note"></div>
                                                <p>Pengajuan anda sedang di proses, Silahkan tunggu telepon dari admin</p>
                                            </div>

                                        </div>

                                        <div className='card-btn'>
                                            <ButtonLihatPengajuan onSuccess={item.id}/>

                                        </div>
                                    </div>

                                </div>

                            </div>
                        ))}
                </>
            ) : (
                <div>
                    <NotFound/>
                </div>
            )}
            
        </>
    )
}

export default TabelPengajuanProses