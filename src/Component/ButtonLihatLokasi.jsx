import React from 'react'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import Swal from 'sweetalert2'

const ButtonLihatLokasi = ({ onSuccess }) => {

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
                title: 'Data Lokasi',
                html: renderFetchedLokasi(response.data),
                icon: 'info',
                confirmButtonText: 'OK',
                confirmButtonColor: '#00aa0e',
                width: '50%',
            });
        } catch (error) {
            console.log('Error: ', error);
            Swal.fire({
                title: 'Data Lokasi',
                html: 'Data Tidak Ditemukan',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    }

    const renderFetchedLokasi = (lokasiData) => {
        if (lokasiData === 404) {
            return '<p>No Lokasi data available</p>';
        }

        // Format Lokasi data as needed
        const formattedData = `
        <div style="display: flex; ">
        <div style="width: 50%; padding-right: 20px; text-align: left; border-bottom: 2px solid;">
            <p><strong>Lokasi Tanah</strong></p>
            <p><strong>Rt</strong></p>
            <p><strong>Rw</strong></p>
            <p><strong>Kelurahan</strong></p>
            <p><strong>Kecamatan</strong></p>
            <p><strong>Keperluan</strong></p>
            <p><strong>Sertifikat Tanah</strong></p>
            <p><strong>Nomor Sertifikat</strong></p>
            <p><strong>Luas Tanah</strong></p>
            <p><strong>Pemilik</strong></p>
        </div>
        <div style="width: 50%; text-align: left; border-bottom: 2px solid;">
            <p>: ${lokasiData.loktanah}</p>
            <p>: ${lokasiData.rt}</p>
            <p>: ${lokasiData.rw}</p>
            <p>: ${lokasiData.kelurahan}</p>
            <p>: ${lokasiData.kecamatan}</p>
            <p>: ${lokasiData.keperluan}</p>
            <p>: ${lokasiData.stanah}</p>
            <p>: ${lokasiData.nocert}</p>
            <p>: ${lokasiData.luas}</p>
            <p>: ${lokasiData.atasnama}</p>
        </div>
      </div>
        `; 
        return formattedData;
    };

    return (
        <Button onClick={fetchLokasi}>
            Lihat
        </Button>
    )
}

export default ButtonLihatLokasi