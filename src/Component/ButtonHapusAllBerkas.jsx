import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

const ButtonHapusAllBerkas = ({ onSuccess }) => {
    const backendUrl = process.env.REACT_APP_ENDPOINT

    const [apiSuccess, setApiSuccess] = useState(false);

    const hapusBerkas = async () => {
        try {

            Swal.fire({
                title: 'Hapus Berkas?',
                html: 'Berkas, dan Lokasi yang berelasi dengan Pengajuan akan ikut terhapus, Lanjutkan?',
                icon: 'warning',
                confirmButtonText: 'Hapus',
                confirmButtonColor: '#d33',
                showCancelButton: true,
                cancelButtonText: 'Batal',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        // ambil token dari cookie
                        const token = document.cookie.replace(/(?:^|.*;\s*)token\s*=\s*([^;]*).*$|^.*$/, "$1");
                        //set cookie as header
                        const config = {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        };
                        await axios.delete(`${backendUrl}/pengajuan/delete/${onSuccess}`, config)

                        await axios.delete(`${backendUrl}/lokasi/deletepengajuan/${onSuccess}`, config)

                        await axios.delete(`${backendUrl}/dokumen/alldelete/${onSuccess}`, config)

                        setApiSuccess(true);

                        Swal.fire({
                            icon: 'success',
                            text: 'Data Behasil di Hapus',
                            timer: 3000
                        })

                    } catch (error) {
                        console.log(error);
                        Swal.fire({
                            title: 'Hapus Berkas',
                            html: 'Data Tidak Ditemukan',
                            icon: 'error',
                            confirmButtonText: 'OK',
                        });
                    }
                }
            });


        } catch (error) {
            return console.log(error);
        }
    }

    useEffect(() => {
        if (apiSuccess) {
            window.location.reload();
        }
    }, [apiSuccess]);
    return (
        <Button style={{ marginRight: '10px' }} variant='danger' onClick={hapusBerkas}>
            Hapus
        </Button>)
}

export default ButtonHapusAllBerkas