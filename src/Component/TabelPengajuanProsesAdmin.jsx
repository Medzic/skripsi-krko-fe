import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import TabelPengajuanProsesSkeleton from './Skeleton/TabelPengajuanProsesSkeleton';
import ButtonPengajuanProses from './ButtonPengajuanProses';
import './TabelPengajuanAdmin.css'
import { MailIcon, MapPin, PhoneIcon, User2Icon } from 'lucide-react';

const TabelPengajuanProsesAdmin = () => {
  const backendUrl = process.env.REACT_APP_ENDPOINT

  const [isLoading, setIsLoading] = useState(true);
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

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAllData();
  }, [])



  return (
    <>
      {isLoading ? (
        <TabelPengajuanProsesSkeleton />
      ) : data.length === 0 ? (
        <Table className='position-relative' striped bordered hover size="sm">
          <thead>
            <tr>
              <th>
                Data Tidak Ditemukan
              </th>
            </tr>
          </thead>
        </Table>
      ) : (
        <>
          {data.map((item, index) => (
            <div key={index} className='card-container'>
              <div className='card-user'>
              <User2Icon/> 
                <h3>{item.nama}</h3>
              </div>
              <div className='card-user'>
                <MailIcon/>
                <h3>{item.email}</h3>              
              </div>
              <div className='card-user'>
              <PhoneIcon/>
                <h3>{item.telp}</h3>              
              </div>
              <div className='card-user'>
                <MapPin/>
                <h3>{item.alamat}</h3>              
              </div>

              {item.Pengajuans.length === 0 ? (
                <div className='tabel-pengajuan'>data tidak ditemukan</div>
              ) : (
                <Dropdown data={item.Pengajuans} />

              )}
            </div>
          ))}
        </>
      )}
    </>
  )
}

const Dropdown = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="tabel-pengajuan" >
      {data.filter(pengajuan => pengajuan.Lokasi !== null && pengajuan.Filestorages.length > 0 && pengajuan.noreg === null && pengajuan.notes === null).length > 0 ?
        (<button className="dropdown-button" onClick={toggleDropdown}>
          Lihat Data
        </button>) : (
          <div className='tabel-pengajuan'>data tidak ditemukan</div>
        )}

      {isOpen && (
        <Table className='tabel-pengajuan' striped bordered hover size="sm">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Pemohon</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data
              .filter(pengajuan => pengajuan.Lokasi !== null && pengajuan.Filestorages.length > 0 && pengajuan.noreg === null && pengajuan.notes === null)
              .map((filteredPengajuan, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{filteredPengajuan.namep1}</td>
                  <td className='btn-proses'>
                    <ButtonPengajuanProses dataId={filteredPengajuan.id} />
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default TabelPengajuanProsesAdmin