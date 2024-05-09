import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from 'react-bootstrap';
import TabelPengajuanSkeleton from './Skeleton/TabelPengajuanSkeleton';
import './TabelPengajuan.css'
import { useNavigate } from 'react-router-dom';

const TabelPengajuanTerima = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate()


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
            ) : data.filter(pengajuan => pengajuan.noreg === null).length === 0 ? (
                <div>
                    Data Tidak Ditemukan
                </div>
            ) : (
                <>
                    {data
                        .filter(pengajuan => pengajuan.noreg)
                        .map((item, index) => (
                            <div key={index} className='card-user-container'>
                                <div className="print-container">
                                    <div className="header-acc-card">
                                        <h1>Pengajuan Diterima</h1>
                                    </div>

                                    <div className="item-container">
                                        <div className='card-user-item'>
                                            <h3>PId: {item.id}</h3>
                                            <h3>Pemohon: {item.namep}</h3>
                                            <h3>No Registrasi: {item.noreg}</h3>
                                            <div>
                                                <h5>Catatan: </h5>
                                                <div className="note"></div>
                                                <p>Silahkan Transfer biaya registrasi Sejumlah Rp. xxx ke nomor Rekening berikut 0235xxxx atas nama xxxx.</p>
                                                <p> Cetak bukti berikut, serta menunjukkan bukti Transfer ke kantor Dinas PUPR Kota Tegal untuk mendapatkan surat fisik  </p>
                                            </div>

                                        </div>

                                        <div className='card-btn'>
                                            <Button onClick={() => navigate(`/Print/${item.id}`)}>Cetak</Button>
                                            <Button>Arsipkan</Button>

                                        </div>
                                    </div>

                                </div>

                            </div>
                        ))}
                </>
            )}
        </>
    )
}

export default TabelPengajuanTerima