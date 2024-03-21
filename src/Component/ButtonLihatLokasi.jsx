import React from 'react'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import Swal from 'sweetalert2'

const ButtonLihatLokasi = ({onSuccess}) => {

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

            const response = await axios.get(`http://localhost:3000/lokasi/${onSuccess}`, config)
            Swal.fire({
                title: 'Fetched Lokasi',
                html: renderFetchedLokasi(response.data),
                icon: 'info',
                confirmButtonText: 'OK',
              });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    const renderFetchedLokasi = (lokasiData) => {
        if (lokasiData === 404) {
          return '<p>No Lokasi data available</p>';
        }
    
        // Format Lokasi data as needed
        const formattedData = `<p>${lokasiData.atasnama}</p>
        <p>${lokasiData.kelurahan}</p>
        <p>${lokasiData.kecamatan}</p>
        <p>${lokasiData.loktanah}</p>
        <p>${lokasiData.rt}</p>
        <p>${lokasiData.rw}</p>
        <p>${lokasiData.stanah}</p>
        <p>${lokasiData.nocert}</p>
        <p>${lokasiData.luas}</p>
        <p>${lokasiData.id}</p>
        `; // Adjust this based on your data structure
        return formattedData;
      };

    return (
        <Button onClick={fetchLokasi}>
            Lihat
        </Button>
    )
}

export default ButtonLihatLokasi