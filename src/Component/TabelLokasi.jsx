import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import './TabelLokasi.css'
import ButtonLihatLokasi from './ButtonLihatLokasi';
import TabelLokasiSkeleton from './Skeleton/TabelLokasiSkeleton';

const TabelLokasi = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchLokasi();
    }, [])

    const filteredData = data.filter(item => item.Lokasi);

    return (
        <div>
            {isLoading ? ( 
                <TabelLokasiSkeleton />
            ) : (
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
                    {filteredData.map((item, index) => (
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
            )}
        </div>
    )
}

export default TabelLokasi