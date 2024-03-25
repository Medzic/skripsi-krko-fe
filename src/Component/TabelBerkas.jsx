import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { NavLink } from 'react-router-dom'

const TabelBerkas = () => {
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

            const response = await axios.get('http://localhost:3000/dokumen', config)
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
            <Table className='position-relative' striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Nama Berkas</th>
                        <th>Link</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1} </td>
                            <td>{item.name}</td>
                            <td><NavLink to={`https://docs.google.com/viewer?url=${encodeURIComponent(item.url)}`} target='_blank' rel='noreferrer'>Lihat Berkas</NavLink></td>
                            <td className='m-1'>
                                <Button className="edit">Edit</Button>
                                <Button className="hapus">Hapus</Button>
                            </td>
                        </tr>))}
                </tbody>
            </Table>
        </div>
    )
}

export default TabelBerkas