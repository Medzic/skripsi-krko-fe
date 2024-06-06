import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import Swal from 'sweetalert2'

const ButtonHapusBerkas = ({ onSuccess }) => {
    const backendUrl = process.env.REACT_APP_ENDPOINT

    const [apiSuccess, setApiSuccess] = useState(false);

    const hapusBerkas = async () => {
        try {
            // ambil token dari cookie
            const token = document.cookie.replace(/(?:^|.*;\s*)token\s*=\s*([^;]*).*$|^.*$/, "$1");
            //set cookie as header
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const response = await axios.get(`${backendUrl}/dokumen/${onSuccess}`, config)

            Swal.fire({
                title: 'Hapus Berkas?',
                html: renderFetchedBerkas(response.data),
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

                        await axios.delete(`${backendUrl}/dokumen/delete/${onSuccess}`, config)

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

    const renderFetchedBerkas = (berkasData) => {
        if (berkasData === 404) {
            return '<p>No lokasi data available</p>';
        }

        // Format lokasi data as needed
        const formattedData = ` 
            <h5>Nama Berkas: ${berkasData.filename ?? ''}</h5>                  
        `;
        return formattedData;
    };

    useEffect(() => {
        if (apiSuccess) {
            window.location.reload();
        }
    }, [apiSuccess]);

    return (
        <Button style={{ marginRight: '10px'  }} variant='danger' onClick={hapusBerkas}>
            Hapus
        </Button>
    )
}

export default ButtonHapusBerkas