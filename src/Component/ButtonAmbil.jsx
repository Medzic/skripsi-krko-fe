import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import Swal from 'sweetalert2';

const ButtonAmbil = ({ onSuccess }) => {
  const [apiSuccess, setApiSuccess] = useState(false);

  const ambil = () => {
    const data = {
      picked: true
    }

    Swal.fire({
      title: "Yakin Pengajuan ini sudah bisa diambil? ",
      text: `Pengajuan Id: ${onSuccess}`,
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

          const response = await axios.patch(`http://localhost:3000/pengajuan/picked/${onSuccess}`, data, config);
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
    <Button variant='success' onClick={ambil}>Bisa Diambil</Button>
  )
}

export default ButtonAmbil