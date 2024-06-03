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
                width: '80%',
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
        <table>
            <tr>
                <th class='th-style' style='display: flex; width: 100%;'><strong>Lokasi Tanah</strong></th>
                <td class='td-style'>: ${lokasiData.loktanah}</td>

            </tr>
            <tr>
                <th class='th-style' style='display: flex; width: 100%;' ><strong>Rt</strong></th>
                <td class='td-style'>: ${lokasiData.rt}</td>

            </tr>
            <tr>
                <th class='th-style' style='display: flex; width: 100%;' ><strong>Rw</strong></th>
                <td class='td-style'>: ${lokasiData.rw}</td>

            </tr>
            <tr>
                <th class='th-style' style='display: flex; width: 100%;'><strong>Kelurahan</strong></th>
                <td class='td-style'>: ${lokasiData.kelurahan}</td>

            </tr>
            <tr>
                <th class='th-style' style='display: flex; width: 100%;'><strong>Kecamatan</strong></th>
                <td class='td-style'>: ${lokasiData.kecamatan}</td>

            </tr>
            <tr>
                <th class='th-style' style='display: flex; width: 100%;' ><strong>Keperluan</strong></th>
                <td class='td-style'>: ${lokasiData.keperluan}</td>

            </tr>
            <tr>
                <th class='th-style' style='display: flex; width: 100%;' ><strong>Sertifikat Tanah</strong></th>
                <td class='td-style'>: ${lokasiData.stanah}</td>

            </tr>
            <tr>
                <th class='th-style' style='display: flex; width: 100%;' ><strong>Nomor Sertifikat</strong></th>
                <td class='td-style'>: ${lokasiData.nocert}</td>

            </tr>
            <tr>
                <th class='th-style' style='display: flex; width: 100%;' ><strong>Luas Tanah</strong></th>
                <td class='td-style'>: ${lokasiData.luas}</td>

            </tr>
            <tr>
                <th class='th-style' style='display: flex; width: 100%;' ><strong>Atas Nama Sertifiakat</strong></th>
                <td class='td-style'>: ${lokasiData.atasnama}</td>

            </tr>
        </table>
        `; 
        return formattedData;
    };

    return (
        <Button style={{ marginRight: '10px'  }} variant='success' onClick={fetchLokasi}>
            Lihat
        </Button>
    )
}

export default ButtonLihatLokasi