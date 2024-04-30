import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import './TabelPengajuan.css'
import TabelPengajuanProsesSkeleton from './Skeleton/TabelPengajuanProsesSkeleton';
import ButtonPengajuanProses from './ButtonPengajuanProses';

const TabelPengajuanProses = () => {
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
            const response = await axios.get('http://localhost:3000/admin/getaccpengajuan', config)
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
                            <h3>{item.nama}</h3>
                            <h3>{item.email}</h3>
                            <h3>{item.telp}</h3>
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
        <button className="dropdown-button" onClick={toggleDropdown}>
          Lihat Data
        </button>
        {isOpen && (
          <Table className='tabel-pengajuan' striped bordered hover size="sm">
            <thead>
              <tr>
                <th>No.</th>
                <th>Nama Pemohon</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data
              .filter(pengajuan => pengajuan.Lokasi !== null && pengajuan.Filestorages.length > 0 && pengajuan.noreg === null)
              .map((filteredPengajuan, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>                  
                  <td>{filteredPengajuan.namep}</td>
                  <td className='btn-proses'>
                    <ButtonPengajuanProses dataId={filteredPengajuan.id}/>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    );
  };

export default TabelPengajuanProses