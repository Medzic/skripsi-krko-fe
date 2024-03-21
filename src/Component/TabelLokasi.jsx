import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import './TabelLokasi.css'
import ButtonLihatLokasi from './ButtonLihatLokasi';

const TabelLokasi = () => {
    const [data, setData] = useState([]);

    const fetchLokasi = async () => {
        try {
            // ambil token dari cookie
            const token = document.cookie.replace(/(?:^|.*;\s*)token\s*=\s*([^;]*).*$|^.*$/, "$1");
            //set cookie as header
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const response = await axios.get('http://localhost:3000/lokasi', config)
            setData(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchLokasi();
    }, [])


    return (
        <div>

            {/* <Dropdown>
                     <Dropdown.Toggle className='d-flex' variant="primary" id="dropdown-basic">
                       <h1>Nama Pemohon: </h1>
                       <h2>{item.namep}</h2>
                     </Dropdown.Toggle>

                     <Dropdown.Menu>
                       <div className="d-flex">
                         <div className="flex-fill px-2">
                         <table className='position-relative'>
                        <thead>
                            <tr>
                                <th>Lokasi Tanah</th>
                                <th>Rt</th>
                                <th>Rw</th>
                                <th>Kelurahan</th>
                                <th>Kecamatan</th>
                                <th>Keperluan</th>
                                <th>Sertifikat tanah</th>
                                <th>No. Sertifikat</th>
                                <th>Luas Tanah</th>
                                <th>Pemilik</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr  >
                                <td>{item.Lokasi?.loktanah}</td>
                                <td>{item.Lokasi?.rt}</td>
                                    <td>{item.Lokasi?.rw}</td>
                                    <td>{item.Lokasi?.kelurahan}</td>
                                    <td>{item.Lokasi?.kecamatan}</td>
                                    <td>{item.Lokasi?.keperluan}</td>
                                    <td>{item.Lokasi?.stanah}</td>
                                    <td>{item.Lokasi?.nocert}</td>
                                    <td>{item.Lokasi?.luas}</td>
                                    <td>{item.Lokasi?.atasnama}</td>
                            </tr>
                        </tbody>
                    </table>
                         </div>
                       </div>
                     </Dropdown.Menu>
                   </Dropdown> */}

            <Table className='position-relative' striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Nama Pemohon</th>
                        <th>Lokasi Tanah</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1} </td>
                            <td>{item.namep}</td>
                            <td>{item.Lokasi?.loktanah}</td>
                            <td className='m-1'>
                                <ButtonLihatLokasi onSuccess={item.Lokasi?.id} className="lihat"/>
                                <Button className="edit">Edit</Button>
                                <Button className="hapus">Hapus</Button>
                            </td>
                        </tr>))}
                </tbody>
            </Table>
        </div>
    )
}

export default TabelLokasi