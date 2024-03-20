import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import './PengajuanTabel.css'
import axios from 'axios';

const PengajuanTabel = () => {
    const [data, setData] = useState([]);

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
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchPengajuan();
    }, [])

    return (
        <>
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
                                <Button className="lihat">Lihat</Button>
                                <Button className="edit">Edit</Button>
                                <Button className="hapus">Hapus</Button>
                            </td>
                        </tr>))}

                </tbody>
            </Table>

            {/* <table className='container'>
                <tr>
                    <th>No.</th>
                    <th>Nama</th>
                    <th>Aksi</th>
                </tr>

                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.namep}</td>
                        <td>
                            <button className="lihat">Lihat</button>
                            <button className="edit">Edit</button>
                            <button className="hapus">Hapus</button>
                        </td>
                    </tr>
                ))}
            </table> */}
        </>
    )
}

export default PengajuanTabel