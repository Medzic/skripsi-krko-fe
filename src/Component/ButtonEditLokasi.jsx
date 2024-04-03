import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import Button from 'react-bootstrap/Button'


const ButtonEditLokasi = ({ onSuccess }) => {
    const [apiSuccess, setApiSuccess] = useState(false);




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

            // fetch lokasi data spesifik
            const responseSpecified = await axios.get(`http://localhost:3000/lokasi/${onSuccess}`, config)
            const specifiedLokasiData = responseSpecified.data;
            const responseAll = await axios.get('http://localhost:3000/pengajuan', config)
            const allPengajuanData = responseAll.data;


            Swal.fire({
                title: 'Data Lokasi',
                html: renderFetchedLokasi(specifiedLokasiData, allPengajuanData),
                icon: 'info',
                confirmButtonText: 'Edit',
                confirmButtonColor: '#00aa0e',
                width: '90%',
                showCancelButton: true,
                cancelButtonText: 'Batal',
                preConfirm: () => {
                    return [
                        document.getElementById('pengajuanId').value,
                        document.getElementById('loktanah').value,
                        document.getElementById('rt').value,
                        document.getElementById('rw').value,
                        document.getElementById('kelurahan').value,
                        document.getElementById('kecamatan').value,
                        document.getElementById('keperluan').value,
                        document.getElementById('stanah').value,
                        document.getElementById('nocert').value,
                        document.getElementById('luas').value,
                        document.getElementById('atasnama').value,
                    ]
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    editLokasi(result.value);
                    console.log(result.value);
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

    const renderFetchedLokasi = (lokasiData, allPengajuan) => {
        if (lokasiData.length === 0) {
            return '<p>No Lokasi data available</p>';
        }
        if (allPengajuan.length === 0) {
            return '<p>No Pengajuan data available</p>';
        }

        const filterData = ((data) => data.id !== lokasiData.Pengajuan.id)


        // Format Lokasi data as needed
        const formattedData = `
        <table>
        <tr>
                        <th class='th-style' style='display: flex; width: 100%;'><strong>Pengajuan</strong></th>
                        <td class='td-style'>: 
                            <select style=' width: 90%;' id='pengajuanId' >
                            
                                <option value='${lokasiData.Pengajuan.id}' >${lokasiData.Pengajuan.namep}</option>
                                ${allPengajuan.filter(filterData).map(item =>
                                    item.id !== lokasiData.Pengajuan.id ? 
                                    `<option value="${item.id}">${item.namep}</option>` : ''
                                ).join('')}
                            </select>
                        </td>

                    </tr>
                    <tr>
                        <th class='th-style' style='display: flex; width: 50%;'><strong>Lokasi Tanah</strong></th>
                        <td class='td-style'>: <input id='loktanah' style='width: 90%; border: none; border-bottom: 2px solid;' type='text' value='${lokasiData.loktanah}' /> </td>
                    </tr>
                    <tr>
                        <th class='th-style' style='display: flex; width: 50%;' ><strong>Rt</strong></th>
                        <td class='td-style'>: <input id='rt' style='width: 90%; border: none; border-bottom: 2px solid;' type='text' value='${lokasiData.rt}' /></td>

                    </tr>
                    <tr>
                        <th class='th-style' style='display: flex; width: 50%;' ><strong>Rw</strong></th>
                        <td class='td-style'>: <input id='rw' style='width: 90%; border: none; border-bottom: 2px solid;' type='text' value='${lokasiData.rw}' /></td>

                    </tr>
                    <tr>
                        <th class='th-style' style='display: flex; width: 50%;'><strong>Kelurahan</strong></th>
                        <td class='td-style'>: <input id='kelurahan' style='width: 90%; border: none; border-bottom: 2px solid;' type='text' value='${lokasiData.kelurahan}' /></td>

                    </tr>
                    <tr>
                        <th class='th-style' style='display: flex; width: 50%;'><strong>Kecamatan</strong></th>
                        <td class='td-style'>: <input id='kecamatan' style='width: 90%; border: none; border-bottom: 2px solid;' type='text' value='${lokasiData.kecamatan}' /></td>

                    </tr>
                    <tr>
                        <th class='th-style' style='display: flex; width: 50%;'><strong>Keperluan</strong></th>
                        <td class='td-style'>: <input id='keperluan' style='width: 90%; border: none; border-bottom: 2px solid;' type='text' value='${lokasiData.keperluan}' /></td>

                    </tr>
                    <tr>
                        <th class='th-style' style='display: flex; width: 50%;'><strong>Sertifikat Tanah</strong></th>
                        <td class='td-style'>: <input id='stanah' style='width: 90%; border: none; border-bottom: 2px solid;' type='text' value='${lokasiData.stanah}' /></td>

                    </tr>
                    <tr>
                        <th class='th-style' style='display: flex; width: 50%;' ><strong>Nomor Sertifikat</strong></th>
                        <td class='td-style'>: <input id='nocert' style='width: 90%; border: none; border-bottom: 2px solid;' type='text' value='${lokasiData.nocert}' /></td>

                    </tr>
                    <tr>
                        <th class='th-style' style='display: flex; width: 50%;' ><strong>Luas Tanah</strong></th>
                        <td class='td-style'>: <input id='luas' style='width: 90%; border: none; border-bottom: 2px solid;' type='text' value='${lokasiData.luas}' /></td>

                    </tr>
                    <tr>
                        <th class='th-style' style='display: flex; width: 50%;' ><strong>Pemilik</strong></th>
                        <td class='td-style'>: <input id='atasnama' style='width: 90%; border: none; border-bottom: 2px solid;' type='text' value='${lokasiData.atasnama}' /></td>

                    </tr>
                </table>
        `;
        return formattedData;
    };

    const editLokasi = async (formData) => {
        const [
            pengajuanId,
            loktanah,
            rt,
            rw,
            kelurahan,
            kecamatan,
            keperluan,
            stanah,
            nocert,
            luas,
            atasnama
        ] = formData;

        const data = {
            pengajuanId,
            loktanah,
            rt,
            rw,
            kelurahan,
            kecamatan,
            keperluan,
            stanah,
            nocert,
            luas,
            atasnama
        };

        try {
            // ambil token dari cookie
            const token = document.cookie.replace(/(?:^|.*;\s*)token\s*=\s*([^;]*).*$|^.*$/, "$1");
            //set cookie as header
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const response = await axios.put(`http://localhost:3000/lokasi/edit/${onSuccess}`, data, config)
            console.log('Data posted successfully:', response.data);

            setApiSuccess(true);

            Swal.fire({
                icon: 'success',
                text: 'Data Behasil di Edit',
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

    useEffect(() => {
        if (apiSuccess) {
            window.location.reload();
        }
    }, [apiSuccess]);

    return (
        <Button onClick={fetchLokasi}>
            Edit
        </Button>
    )
}

export default ButtonEditLokasi