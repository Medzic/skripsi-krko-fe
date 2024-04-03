import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import './TabelPengajuan.css'
import axios from 'axios';
import ButtonLihatPengajuan from './ButtonLihatPengajuan';
import TabelPengajuanSkeleton from './Skeleton/TabelPengajuanSkeleton';
import ButtonEditPengajuan from './ButtonEditPengajuan';
import ButtonHapusPengajuan from './ButtonHapusPengajuan';

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
            ) : (
                <Table className='position-relative' striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Nama Pemohon</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1} </td>
                                <td>{item.namep}</td>
                                <td>
                                    <ButtonLihatPengajuan onSuccess={item.id} />
                                    <ButtonEditPengajuan onSuccess={item.id}/>
                                    <ButtonHapusPengajuan onSuccess={item.id} />
                                </td>
                            </tr>))}
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default TabelPengajuan