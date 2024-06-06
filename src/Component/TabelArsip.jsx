import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import './TabelPengajuan.css'
import axios from 'axios';
import TabelPengajuanSkeleton from './Skeleton/TabelPengajuanSkeleton';
import ButtonLihatPengajuanDetail from './ButtonLihatPengajuanDetail';
import { useNavigate } from 'react-router-dom';

const TabelArsip = () => {
    const backendUrl = process.env.REACT_APP_ENDPOINT

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
                        {data.filter(item => item.arsip === true).length > 0 ? (
                            data.filter(item => item.arsip === true).map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.namep1}</td>
                                    <td className='tabel-btn'>
                                        <Button onClick={() => navigate(`/Print/${item.id}`)}>Cetak</Button>

                                        <ButtonLihatPengajuanDetail onSuccess={item.id} />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">Data tidak ditemukan</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default TabelArsip