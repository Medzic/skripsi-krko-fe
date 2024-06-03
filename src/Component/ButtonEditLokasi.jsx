import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import Button from 'react-bootstrap/Button'


const ButtonEditLokasi = ({ onSuccess, onText }) => {
    const [apiSuccess, setApiSuccess] = useState(false);

    const handleLengthChange = (event) => {
        const setLength = (event.target.value);
    };

    // Function to handle changes in width input
    const handleWidthChange = (event) => {
        const setWidth = (event.target.value);
    };

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
                    // luas
                    const width = document.getElementById('width').value;
                    const length = document.getElementById('length').value;

                    const pengajuanId = document.getElementById('pengajuanId').value;
                    const loktanah = document.getElementById('loktanah').value;
                    const rt = document.getElementById('rt').value;
                    const rw = document.getElementById('rw').value;
                    const kelurahan = document.getElementById('kelurahan').value;
                    const kecamatan = document.getElementById('kecamatan').value;
                    const keperluan = document.getElementById('keperluan').value;
                    const stanah = document.getElementById('stanah').value;
                    const nocert = document.getElementById('nocert').value;
                    const luas = `${length} x ${width}m²`;
                    const atasnama = document.getElementById('atasnama').value;

                    if (!pengajuanId) {
                        Swal.showValidationMessage('Data tidak boleh Kosong');
                        return false;
                    }
                    if (!loktanah) {
                        Swal.showValidationMessage('Data tidak boleh Kosong');
                        return false;
                    }
                    if (!rt) {
                        Swal.showValidationMessage('Data tidak boleh Kosong');
                        return false;
                    }
                    if (!rw) {
                        Swal.showValidationMessage('Data tidak boleh Kosong');
                        return false;
                    }
                    if (!kelurahan) {
                        Swal.showValidationMessage('Data tidak boleh Kosong');
                        return false;
                    }
                    if (!kecamatan) {
                        Swal.showValidationMessage('Data tidak boleh Kosong');
                        return false;
                    }
                    if (!keperluan) {
                        Swal.showValidationMessage('Data tidak boleh Kosong');
                        return false;
                    }
                    if (!stanah) {
                        Swal.showValidationMessage('Data tidak boleh Kosong');
                        return false;
                    }
                    if (!nocert) {
                        Swal.showValidationMessage('Data tidak boleh Kosong');
                        return false;
                    }
                    if (!width) {
                        Swal.showValidationMessage('Data tidak boleh Kosong');
                        return false;
                    }
                    if (!length) {
                        Swal.showValidationMessage('Data tidak boleh Kosong');
                        return false;
                    }
                    if (!atasnama) {
                        Swal.showValidationMessage('Data tidak boleh Kosong');
                        return false;
                    }

                    return [
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
                    ]
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    editLokasi(result.value);
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

    // useEffect(() => {
    //     if (lokasi.luas) {
    //         const luasParts = lokasi.luas.split(' x ');

    //         setLength(luasParts[0]);
    //         setWidth(luasParts[1].replace('m²', ''));
    //     }
    // }, [lokasi.luas]);

    const renderFetchedLokasi = (lokasiData, allPengajuan) => {
        if (lokasiData.length === 0) {
            return '<p>No Lokasi data available</p>';
        }
        if (allPengajuan.length === 0) {
            return '<p>No Pengajuan data available</p>';
        }

        const filterData = ((data) => data.id !== lokasiData.Pengajuan.id && data.Lokasi === null)

        const luasParts = lokasiData.luas.split(' x ');
        const panjang = (luasParts[0]);
        const lebar = (luasParts[1].replace('m²', ''));


        // Format Lokasi data as needed
        const formattedData = `
        <table>
        <tr>
                        <th class='th-style' style='display: flex; width: 100%;'><strong>Pengajuan</strong></th>
                        <td class='td-style'>: 
                            <select style=' width: 90%;' id='pengajuanId' >
                            
                                <option value='${lokasiData.Pengajuan.id}' >${lokasiData.Pengajuan.namep}</option>
                                ${allPengajuan.filter(filterData).map(item =>
            `<option value="${item.id}">${item.namep}</option>`
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
                        <td class='td-style'>:  <select id='kelurahan' style='width: 90%; border: none; border-bottom: 2px solid;'>
                        <option value='${lokasiData.kelurahan}'>${lokasiData.kelurahan}</option>
                        <option value='Cabawan'>Cabawan</option>
                        <option value='Kaligangsa'>Kaligangsa</option>
                        <option value='Kalinyamat Kulon'>Kalinyamat Kulon</option>
                        <option value='Kradon'>Kradon</option>
                        <option value='Margadana'>Margadana</option>
                        <option value='Pesurungan Lor'>Pesurungan Lor</option>
                        <option value='Sumurpanggang'>Sumurpanggang</option>
                        <option value='Debong Lor'>Debong Lor</option>
                        <option value='Kemandungan'>Kemandungan</option>
                        <option value='Kraton'>Kraton</option>
                        <option value='Muarareja'>Muarareja</option>
                        <option value='Pekauman'>Pekauman</option>
                        <option value='Pesurungan Kidul'>Pesurungan Kidul</option>
                        <option value='Tegalsari'>Tegalsari</option>
                        <option value='Bandung'>Bandung</option>
                        <option value='Debong Kidul'>Debong Kidul</option>
                        <option value='Debong Kulon'>Debong Kulon</option>
                        <option value='Debong Tengah'>Debong Tengah</option>
                        <option value='Kalinyamat Wetan'>Kalinyamat Wetan</option>
                        <option value='Keturen'>Keturen</option>
                        <option value='Randugunting'>Randugunting</option>
                        <option value='Tunon'>Tunon</option>
                        <option value='Kejambon'>Kejambon</option>
                        <option value='Mangkukusuman'>Mangkukusuman</option>
                        <option value='Mintaragen'>Mintaragen</option>
                        <option value='Panggung'>Panggung</option>
                        <option value='Slerok'>Slerok</option>

                    </select>
                    </td>

                    </tr>
                    <tr>
                        <th class='th-style' style='display: flex; width: 50%;'><strong>Kecamatan</strong></th>
                        <td class='td-style'>: <select id='kecamatan' style='width: 90%; border: none; border-bottom: 2px solid;'>
                        <option value='${lokasiData.kecamatan}'>${lokasiData.kecamatan}</option>
                        <option value='Tegal Barat'>Tegal Barat</option>
                        <option value='Tegal Timur'>Tegal Timur</option>
                        <option value='Tegal Selatan'>Tegal Selatan</option>
                        <option value='Margadana'>Margadana</option>

                    </select>
                    </td>

                    </tr>
                    <tr>
                        <th class='th-style' style='display: flex; width: 50%;'><strong>Keperluan</strong></th>
                        <td class='td-style'>: <input id='keperluan' style='width: 90%; border: none; border-bottom: 2px solid;' type='text' value='${lokasiData.keperluan}' /></td>

                    </tr>
                    <tr>
                        <th class='th-style' style='display: flex; width: 50%;'><strong>Sertifikat Tanah</strong></th>
                        <td class='td-style'>: <select id='stanah' style='width: 90%; border: none; border-bottom: 2px solid;'>
                        <option value='${lokasiData.stanah}'>${lokasiData.stanah}</option>
                        <option value='Hak Milik'>Hak Milik (HM)</option>
                        <option value='Hak Guna Bangunan'>Hak Guna Bangunan (HGB)</option>
                        <option value='Hak Pakai'>Hak Pakai (HP)</option>
                        <option value='Hak Pengelolaan'>Hak Pengelolaan (HPL)</option>
                        <option value='Hak Wakaf'>Hak Wakaf (HW)</option>

                        </select></td>

                    </tr>
                    <tr>
                        <th class='th-style' style='display: flex; width: 50%;' ><strong>Nomor Sertifikat</strong></th>
                        <td class='td-style'>: <input id='nocert' style='width: 90%; border: none; border-bottom: 2px solid;' type='text' value='${lokasiData.nocert}' /></td>

                    </tr>
                    <tr>
                        <th class='th-style' style='display: flex; width: 50%;' ><strong>Luas Tanah</strong></th>
                        <td class='td-style'>: <input id='length' style='width: 30%; border: none; border-bottom: 2px solid;' type='number' value='${panjang}' onChange='${handleLengthChange}' placeholder='Panjang'/> 
                        x 
                        <input id='width' style='width: 30%; border: none; border-bottom: 2px solid;' type='number' value='${lebar}' onChange='${handleWidthChange}' placeholder='Lebar'/> 
                        m²</td>

                    </tr>
                    <tr>
                        <th class='th-style' style='display: flex; width: 50%;' ><strong>Atas nama Sertifikat</strong></th>
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

    const Text = 'Edit'

    return (
        <Button variant='warning' onClick={fetchLokasi}>
            {onText ? onText : Text}
        </Button>
    )
}

export default ButtonEditLokasi