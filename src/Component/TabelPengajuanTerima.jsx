import React, { useEffect, useState } from 'react'
import axios from 'axios'
import TabelPengajuanSkeleton from './Skeleton/TabelPengajuanSkeleton';
import './TabelPengajuan.css'
import ButtonArsipkan from './ButtonArsipkan';
import NotFound from './NotFound';
import Printed from './Printed';

const TabelPengajuanTerima = () => {
    const backendUrl = process.env.REACT_APP_ENDPOINT

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

            const response = await axios.get(`${backendUrl}/pengajuan`, config)
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
            ) : data.filter(pengajuan => pengajuan.picked === true && pengajuan.arsip === false).length > 0 ? (
                <>
                    {data
                        .filter(pengajuan => pengajuan.picked === true && pengajuan.arsip === false)
                        .map((item, index) => (
                            <div key={index} className='card-user-container'>
                                <div className="print-container">
                                    <div className="header-acc-card">
                                        <h1>Pengajuan Diterima</h1>
                                    </div>

                                    <div className="item-container">
                                        <div className='card-user-item'>
                                            <h3>PId: {item.id}</h3>
                                            <h3>Pemohon: {item.namep1}</h3>
                                            <h3>No Registrasi: {item.noreg}</h3>
                                            <div>
                                                <h5>Catatan: </h5>
                                                <div className="note"></div>
                                                <p>Silahkan Transfer biaya registrasi Sejumlah Rp. xxx ke nomor Rekening berikut 0235xxxx atas nama xxxx.</p>
                                                <p> Cetak bukti berikut, serta menunjukkan bukti Transfer ke kantor Dinas PUPR Kota Tegal untuk mendapatkan surat fisik  </p>
                                            </div>

                                        </div>

                                        <div className='card-btn'>
                                            <Printed onSuccess={item.id}>Cetak</Printed>
                                            <ButtonArsipkan onSuccess={item.id}/>

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
            ) }
        </>
    )
}

export default TabelPengajuanTerima