import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import Swal from 'sweetalert2';

const ButtonArsipkan = ({onSuccess}) => {
    const backendUrl = process.env.REACT_APP_ENDPOINT

    const [apiSuccess, setApiSuccess] = useState(false);

    const arsipkan = () => {
        const data = {
            arsip: true
        }

        Swal.fire({
            title: "Yakin ingin Mengarsipkan? ",
            text:`Pengajuan Id: ${onSuccess}` ,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak"
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

                    const response = await axios.patch(`${backendUrl}/pengajuan/arsip/${onSuccess}`, data, config);
                    console.log('Data posted successfully:', response.data);

                    setApiSuccess(true);

                    Swal.fire({
                        icon: 'success',
                        text: 'Data Behasil di input',
                        timer: 3000
                    })


                } catch (error) {
                    console.error('Error posting data:', error);
                    Swal.fire({
                        icon: 'error',
                        text: error,
                        timer: 3000
                    })
                }
            }
        });
    }

    useEffect(() => {
        if (apiSuccess) {
            window.location.reload();
        }
    })

  return (
    <Button onClick={arsipkan}>Arsipkan</Button>
  )
}

export default ButtonArsipkan