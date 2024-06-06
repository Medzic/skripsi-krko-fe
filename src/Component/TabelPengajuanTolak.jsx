import React, { useEffect, useState } from 'react'
import axios from 'axios'
import TabelPengajuanSkeleton from './Skeleton/TabelPengajuanSkeleton';
import './TabelPengajuan.css'
import { Button } from 'react-bootstrap';
import ButtonEditPengajuan from './ButtonEditPengajuan';
import ButtonEditLokasi from './ButtonEditLokasi';
import { useNavigate } from 'react-router-dom';
import ButtonReconfirm from './ButtonReconfirm';
import NotFound from './NotFound';

const TabelPengajuanTolak = () => {
  const backendUrl = process.env.REACT_APP_ENDPOINT

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
      ) : data.filter(pengajuan => pengajuan.notes).length > 0 ? (
        <>
          {data
            .filter(pengajuan => pengajuan.notes)
            .map((item, index) => (
              <div key={index} className='card-user-container'>
                <div className="header-rejected-card">
                  <h1>Pengajuan Ditolak</h1>
                </div>

                <div className="item-container">
                  <div className='card-user-item'>
                    <h3>PId: {item.id}</h3>
                    <h3>Pemohon: {item.namep1}</h3>
                    <div>
                      <h2>Catatan: </h2>
                      <div className="note"></div>
                      <h3>{item.notes}</h3>
                    </div>
                    
                  </div>

                  <div className='card-btn'>
                    {/* mulai dari sini */}
                    <ButtonReconfirm onSuccess={item.id}/>
                    <ButtonEditPengajuan onSuccess={item.id} onText={'Edit Pengajuan'}/>
                    <ButtonEditLokasi onSuccess={item.Lokasi.id} onText={'Edit Lokasi'}/>
                    <Button variant='warning' onClick={() => navigate('/berkas')}>Edit Berkas</Button>
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

export default TabelPengajuanTolak