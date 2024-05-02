import React, { useEffect, useState } from 'react'
import axios from 'axios'
import TabelPengajuanSkeleton from './Skeleton/TabelPengajuanSkeleton';
import './TabelPengajuan.css'
import { Button } from 'react-bootstrap';
import ButtonEditPengajuan from './ButtonEditPengajuan';
import ButtonEditLokasi from './ButtonEditLokasi';
import { useNavigate } from 'react-router-dom';

const TabelPengajuanTolak = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      ) : data.length === 0 ? (
        <div>
          Data Tidak Ditemukan
        </div>
      ) : (
        <>
          {data
            .filter(pengajuan => pengajuan.notes && pengajuan.noreg === null)
            .map((item, index) => (
              <div key={index} className='card-user-container'>
                <div className="header-rejected-card">
                  <h1>Pengajuan Ditolak</h1>
                </div>

                <div className="item-container">
                  <div className='card-user-item'>
                    <h3>PId: {item.id}</h3>
                    <h3>Pemohon: {item.namep}</h3>
                    <div>
                      <h2>Catatan: </h2>
                      <div className="note"></div>
                      <h3>{item.notes}</h3>
                    </div>
                    
                  </div>

                  <div className='card-btn'>
                    <Button>Ajukan Kembali</Button>
                    <ButtonEditPengajuan onSuccess={item.id} onText={'Edit Pengajuan'}/>
                    <ButtonEditLokasi onSuccess={item.id} onText={'Edit Lokasi'}/>
                    <Button variant='warning' onClick={() => navigate('/berkas')}>Edit Berkas</Button>
                  </div>
                </div>

              </div>
            ))}
        </>
      )}
    </>
  )
}

export default TabelPengajuanTolak