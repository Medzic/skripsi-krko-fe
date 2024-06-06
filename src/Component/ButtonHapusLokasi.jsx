import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import Swal from 'sweetalert2'

const ButtonHapusLokasi = ({ onSuccess }) => {
    const backendUrl = process.env.REACT_APP_ENDPOINT

    const [apiSuccess, setApiSuccess] = useState(false);

    const hapusLokasi = async () => {
        try {
            // ambil token dari cookie
            const token = document.cookie.replace(/(?:^|.*;\s*)token\s*=\s*([^;]*).*$|^.*$/, "$1");
            //set cookie as header
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const response = await axios.get(`${backendUrl}/lokasi/${onSuccess}`, config)

            Swal.fire({
                title: 'Hapus Lokasi?',
                html: renderFetchedLokasi(response.data),
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

                        await axios.delete(`${backendUrl}/lokasi/delete/${onSuccess}`, config)

                        setApiSuccess(true);

                        Swal.fire({
                            icon: 'success',
                            text: 'Data Behasil di Hapus',
                            timer: 3000
                        })

                    } catch (error) {
                        console.log(error);
                        Swal.fire({
                            title: 'Hapus Pengajuan',
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

    const renderFetchedLokasi = (lokasiData) => {
        if (lokasiData === 404) {
            return '<p>No lokasi data available</p>';
        }

        // Format lokasi data as needed
        const formattedData = ` 
            <h5>Lokasi Tanah: ${lokasiData.loktanah ?? ''}</h5>                  
        `;
        return formattedData;
    };

    useEffect(() => {
        if (apiSuccess) {
            window.location.reload();
        }
    }, [apiSuccess]);

    return (
        <Button style={{ marginLeft: '10px'  }} variant='danger' onClick={hapusLokasi}>
            Hapus
        </Button>
    )
}

export default ButtonHapusLokasi