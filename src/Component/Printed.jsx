import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import './TabelPengajuan.css'
import { useNavigate } from 'react-router-dom';

const Printed = ({ onSuccess }) => {
    const [item, setItem] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = document.cookie.replace(/(?:^|.*;\s*)token\s*=\s*([^;]*).*$|^.*$/, "$1");
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };
                const response = await axios.get(`http://localhost:3000/pengajuan/${onSuccess}`, config);
                setItem(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [onSuccess]);

    const handlePrint = () => {
        window.print();
    };

    useEffect(() => {
        const printTimeout = setTimeout(() => {
            handlePrint();
        }, 3000); 
    
        return () => clearTimeout(printTimeout);    }, [])

    return (
        <>        
        {item && (
                <div className='print-user-container'>
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
                            <Button onClick={handlePrint}>Cetak</Button>
                            <Button variant='danger' onClick={() => navigate('/Pengajuan-Diterima')}>Kembali</Button>
                        </div>
                    </div>
                </div>
                </div>
            )}
        </>
    );
};

export default Printed;
