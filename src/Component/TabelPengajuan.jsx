import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import ButtonLihatPengajuan from './ButtonLihatPengajuan';
import TabelPengajuanSkeleton from './Skeleton/TabelPengajuanSkeleton';
import ButtonEditPengajuan from './ButtonEditPengajuan';
import ButtonHapusAllBerkas from './ButtonHapusAllBerkas';
import './TabelPengajuan.css'

const TabelPengajuan = () => {
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
                <Table className='position-relative' striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nama Pemohon</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td className='item-id'>{item.id} </td>
                                <td>{item.namep}</td>
                                <td className='tabel-btn'>
                                    <ButtonLihatPengajuan onSuccess={item.id} />
                                    <ButtonEditPengajuan onSuccess={item.id}/>
                                    <ButtonHapusAllBerkas onSuccess={item.id} />
                                </td>
                            </tr>))}
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default TabelPengajuan