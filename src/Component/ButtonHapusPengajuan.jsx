import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import Swal from 'sweetalert2'

const ButtonHapusPengajuan = ({ onSuccess }) => {
    const [apiSuccess, setApiSuccess] = useState(false);

    const hapusPengajuan = async () => {
        try {
            // ambil token dari cookie
            const token = document.cookie.replace(/(?:^|.*;\s*)token\s*=\s*([^;]*).*$|^.*$/, "$1");
            //set cookie as header
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const response = await axios.get(`http://localhost:3000/pengajuan/${onSuccess}`, config)

            Swal.fire({
                title: 'Hapus pengajuan?',
                html: renderFetchedPengajuan(response.data) ,
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
    
                        await axios.delete(`http://localhost:3000/pengajuan/delete/${onSuccess}`, config)

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

    const renderFetchedPengajuan = (pengajuanData) => {
        if (pengajuanData === 404) {
            return '<p>No pengajuan data available</p>';
        }

        // Format pengajuan data as needed
        const formattedData = ` 
            <h5>Pemohon: ${pengajuanData.namep ?? ''}</h5>                  
        `; 
        return formattedData;
    };

    useEffect(() => {
        if (apiSuccess) {
            window.location.reload();
        }
    }, [apiSuccess]);

    return (
        <Button onClick={hapusPengajuan}>
            Hapus
        </Button>
    )
}

export default ButtonHapusPengajuan