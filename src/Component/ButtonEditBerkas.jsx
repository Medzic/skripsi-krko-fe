import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import Button from 'react-bootstrap/Button'
import './ButtonTambah.css'

const ButtonEditBerkas = ({ onSuccess }) => {
    const [apiSuccess, setApiSuccess] = useState(false);    

    const fetchBerkas = async () => {
        try {
            // ambil token dari cookie
            const token = document.cookie.replace(/(?:^|.*;\s*)token\s*=\s*([^;]*).*$|^.*$/, "$1");
            //set cookie as header
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            // fetch lokasi data spesifik
            const responseSpecified = await axios.get(`http://localhost:3000/dokumen/${onSuccess}`, config)
            const specifiedBerkasData = responseSpecified.data;
            const responseAll = await axios.get('http://localhost:3000/pengajuan', config)
            const allPengajuanData = responseAll.data;

            Swal.fire({
                title: 'Data Lokasi',
                html: renderFetchedLokasi(specifiedBerkasData, allPengajuanData),
                icon: 'info',
                confirmButtonText: 'Edit',
                confirmButtonColor: '#00aa0e',
                width: '90%',
                showCancelButton: true,
                cancelButtonText: 'Batal',
                preConfirm: async () => {
                    const pengajuanId = document.getElementById('pengajuanId').value;
                    const files = document.getElementById('files').files[0];
                    return [pengajuanId, files];
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    editBerkas(result.value);
                }
            });
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Data Lokasi',
                html: 'Data Tidak Ditemukan',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    }

    const renderFetchedLokasi = (berkasData, allPengajuan) => {
        if (berkasData.length === 0) {
            return '<p>No Lokasi data available</p>';
        }
        if (allPengajuan.length === 0) {
            return '<p>No Pengajuan data available</p>';
        }


        const filterData = (data) => data.id !== berkasData.Pengajuan.id;

        // Format Lokasi data as needed
        const formattedData = `
            <table>
                <tr>
                    <th class='th-style' style='display: flex; width: 100%;'><strong>Pengajuan</strong></th>
                    <td class='td-style'>: 
                        <select style=' width: 90%;' id='pengajuanId' >
                            <option value='${berkasData.Pengajuan.id}' >${berkasData.Pengajuan.namep}</option>
                            ${allPengajuan.filter(filterData).map(item =>
                                item.id !== berkasData.Pengajuan.id ?
                                `<option value="${item.id}">${item.namep}</option>` : ''
                            ).join('')}
                        </select>
                    </td>
                </tr>
                <tr >
                    <th class='th-style' style='display: flex; width: 100%;' ><strong>Nama File</strong></th>
                    <td class='long-name'><label for='files' style='width: 90%; border: none;' type='text'>: ${berkasData.filename}</label></td>
                </tr>
                <tr >
                    <th class='th-style' style='display: flex; width: 100%;' ><strong>Pilih File</strong></th>
                    <td class='td-style'>: <input id='files' style='width: 90%; border: none;' type='file' /></td>
                </tr>
            </table>
        `;
        return formattedData;
    };

    const editBerkas = async (formData) => {
        const [pengajuanId, files] = formData;

        let data; 
        
        // conditional storing
        if (!files) {
            data = {pengajuanId}
        } else {
            data = {
                pengajuanId,
                files
            };
        }

        Swal.fire({
            icon:'info',
            title: 'sedang mengupload...',
            allowOutsideClick: false,
            showCancelButton: false,
            showConfirmButton: false
          });

        try {
            // ambil token dari cookie
            const token = document.cookie.replace(/(?:^|.*;\s*)token\s*=\s*([^;]*).*$|^.*$/, "$1");
            //set cookie as header
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            };

            const response = await axios.put(`http://localhost:3000/dokumen/edit/${onSuccess}`, data, config)
            console.log('Data posted successfully:', response.data);

            setApiSuccess(true);

            Swal.fire({
                icon: 'success',
                text: 'Data Behasil di Edit',
                timer: 3000
            })
        } catch (error) {
            console.log('Error posting data:', error);
            Swal.fire({
                icon: 'error',
                text: error,
                timer: 3000
            })
        }
    }

    useEffect(() => {
        if (apiSuccess) {
            window.location.reload();
        }
    }, [apiSuccess]);

    return (
        <Button style={{ marginRight: '10px'  }} variant='warning' onClick={fetchBerkas}>
            Edit
        </Button>
    )
}

export default ButtonEditBerkas