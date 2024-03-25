import React from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import Button from 'react-bootstrap/Button'

const ButtonLihatPengajuan = ({ onSuccess }) => {
    const fetchPengajuan = async () => {
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
                title: 'Data pengajuan',
                html: renderFetchedPengajuan(response.data),
                icon: 'info',
                confirmButtonText: 'OK',
                confirmButtonColor: '#00aa0e',
                width: '50%',
            });
            console.log(response);
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Data Pengajuan',
                html: 'Data Tidak Ditemukan',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    }

    const renderFetchedPengajuan = (pengajuanData) => {
        if (pengajuanData === 404) {
            return '<p>No pengajuan data available</p>';
        }

        // Format pengajuan data as needed
        const formattedData = `
        <div style="display: flex;">
            <div style="width: 50%; padding-right: 20px; text-align: left; border-bottom: 2px solid;">
                <p><strong>Tanggal</strong></p>
                <p><strong>Nama Pemohon</strong></p>
                <p><strong>Nama Pengaju 1</strong></p>
                <p><strong>Nama Pengaju 2</strong></p>
                <p><strong>NIK Pengaju 1</strong></p>
                <p><strong>NIK Pengaju 2</strong></p>
                <p><strong>Telepon</strong></p>
                <p><strong>Alamat</strong></p>
                <p><strong>Rt</strong></p>
                <p><strong>Rw</strong></p>
                <p><strong>Kelurahan</strong></p>
                <p><strong>Kecamatan</strong></p>
                <p><strong>Kota</strong></p>
                <p><strong>ID</strong></p>
            </div>
            <div style="width: 50%; text-align: left; border-bottom: 2px solid;">
                <p>: ${pengajuanData.tanggal ?? ''}</p>
                <p>: ${pengajuanData.namep ?? ''}</p>
                <p>: ${pengajuanData.namep1 ?? ''}</p>
                <p>: ${pengajuanData.namep2 ?? ''}</p>
                <p>: ${pengajuanData.nikp1 ?? ''}</p>
                <p>: ${pengajuanData.nikpp2 ?? ''}</p>
                <p>: ${pengajuanData.telp ?? ''}</p>
                <p>: ${pengajuanData.alamat ?? ''}</p>
                <p>: ${pengajuanData.rt ?? ''}</p>
                <p>: ${pengajuanData.rw ?? ''}</p>
                <p>: ${pengajuanData.kelurahan ?? ''}</p>
                <p>: ${pengajuanData.kecamatan ?? ''}</p>
                <p>: ${pengajuanData.kota ?? ''}</p>
                <p>: ${pengajuanData.id ?? ''}</p>
            </div>
        </div>
        `; // Adjust this based on your data structure
        return formattedData;
    };

    return (
        <Button onClick={fetchPengajuan}>
            Lihat
        </Button>
    )
}

export default ButtonLihatPengajuan