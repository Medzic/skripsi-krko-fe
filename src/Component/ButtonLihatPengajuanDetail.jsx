import axios from 'axios';
import React from 'react'
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

const ButtonLihatPengajuanDetail = ({onSuccess}) => {
    const backendUrl = process.env.REACT_APP_ENDPOINT

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

            const response = await axios.get(`${backendUrl}/pengajuan/${onSuccess}`, config)
            Swal.fire({
                title: 'Data pengajuan',
                html: renderFetchedPengajuan(response.data),
                icon: 'info',
                confirmButtonText: 'OK',
                confirmButtonColor: '#00aa0e',
                width: '80%',
            });
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
        <table>
                <tr>
                    <th class='th-style' style='display: flex; width: 50%;' ><strong>Nomer Registrasi</strong></th>
                    <td class='td-style'>: ${pengajuanData.noreg ?? ''}</td>

                </tr>
            <tr style='border-bottom: 5px solid;'>
                <th>
                </th>
                <td>
                </td>
            </tr>
            <tr style='border-bottom: 5px solid;'>
                <th >Pengajuan</th>
            </tr>
                    <tr>
                        <th class='th-style' style='display: flex; width: 50%;'><strong>Tanggal</strong></th>
                        <td class='td-style'>: ${pengajuanData.tanggal ?? ''}</td>

                    </tr>
                    <tr>
                        <th class='th-style' style='display: flex; width: 50%;' ><strong>Nama Pengaju</strong></th>
                        <td class='td-style'>: ${pengajuanData.namep ?? ''}</td>

                    </tr>
                    <tr>
                        <th class='th-style' style='display: flex; width: 50%;' ><strong>Nama Pemohon 1</strong></th>
                        <td class='td-style'>: ${pengajuanData.namep1 ?? ''}</td>

                    </tr>
                    <tr>
                        <th class='th-style' style='display: flex; width: 50%;'><strong>Nama Pemohon 2</strong></th>
                        <td class='td-style'>: ${pengajuanData.namep2 ?? ''}</td>

                    </tr>
                    <tr>
                        <th class='th-style' style='display: flex; width: 50%;'><strong>NIK Pemohon 1</strong></th>
                        <td class='td-style'>: ${pengajuanData.nikp1 ?? ''}</td>

                    </tr>
                    <tr>
                        <th class='th-style' style='display: flex; width: 50%;' ><strong>NIK Pemohon 2</strong></th>
                        <td class='td-style'>: ${pengajuanData.nikp2 ?? ''}</td>

                    </tr>
                    <tr>
                        <th class='th-style' style='display: flex; width: 50%;' ><strong>No. Telp</strong></th>
                        <td class='td-style'>: ${pengajuanData.telp ?? ''}</td>

                    </tr>
                    <tr>
                        <th class='th-style' style='display: flex; width: 50%;' ><strong>Alamat Pemohon</strong></th>
                        <td class='td-style'>: ${pengajuanData.alamat ?? ''}</td>

                    </tr>
                    <tr>
                        <th class='th-style' style='display: flex; width: 50%;' ><strong>Rt</strong></th>
                        <td class='td-style'>: ${pengajuanData.rt ?? ''}</td>

                    </tr>
                    <tr>
                        <th class='th-style' style='display: flex; width: 50%;' ><strong>Rw</strong></th>
                        <td class='td-style'>: ${pengajuanData.rw ?? ''}</td>

                    </tr>
                    <tr>
                        <th class='th-style' style='display: flex; width: 50%;' ><strong>Kelurahan</strong></th>
                        <td class='td-style'>: 
                        ${pengajuanData.kelurahan ?? ''}
                        </td>

                    </tr>
                    <tr>
                        <th class='th-style' style='display: flex; width: 50%;' ><strong>Kecamatan</strong></th>
                        <td class='td-style'>: 
                        ${pengajuanData.kecamatan ?? ''}
                        </td>

                    </tr>
                    <tr>
                        <th class='th-style' style='text-align: left; width: 50%;' ><strong>Kota</strong></th>
                        <td class='td-style' >: ${pengajuanData.kota ?? ''}</td>

                    </tr>
                    <tr style='border-bottom: 5px solid;'>
                        <th>
                        </th>
                        <td>
                        </td>
                    </tr>
                <tr style='border-bottom: 5px solid;'>
                    <th>Lokasi</th>
                </tr>

                <tr>
                <th class='th-style' style='display: flex; width: 100%;'><strong>Lokasi Tanah</strong></th>
                <td class='td-style'>: ${pengajuanData.Lokasi.loktanah}</td>

            </tr>
            <tr>
                <th class='th-style' style='display: flex; width: 100%;' ><strong>Rt</strong></th>
                <td class='td-style'>: ${pengajuanData.Lokasi.rt}</td>

            </tr>
            <tr>
                <th class='th-style' style='display: flex; width: 100%;' ><strong>Rw</strong></th>
                <td class='td-style'>: ${pengajuanData.Lokasi.rw}</td>

            </tr>
            <tr>
                <th class='th-style' style='display: flex; width: 100%;'><strong>Kelurahan</strong></th>
                <td class='td-style'>: ${pengajuanData.Lokasi.kelurahan}</td>

            </tr>
            <tr>
                <th class='th-style' style='display: flex; width: 100%;'><strong>Kecamatan</strong></th>
                <td class='td-style'>: ${pengajuanData.Lokasi.kecamatan}</td>

            </tr>
            <tr>
                <th class='th-style' style='display: flex; width: 100%;' ><strong>Keperluan</strong></th>
                <td class='td-style'>: ${pengajuanData.Lokasi.keperluan}</td>

            </tr>
            <tr>
                <th class='th-style' style='display: flex; width: 100%;' ><strong>Sertifikat Tanah</strong></th>
                <td class='td-style'>: ${pengajuanData.Lokasi.stanah}</td>

            </tr>
            <tr>
                <th class='th-style' style='display: flex; width: 100%;' ><strong>Nomor Sertifikat</strong></th>
                <td class='td-style'>: ${pengajuanData.Lokasi.nocert}</td>

            </tr>
            <tr>
                <th class='th-style' style='display: flex; width: 100%;' ><strong>Luas Tanah</strong></th>
                <td class='td-style'>: ${pengajuanData.Lokasi.luas}</td>

            </tr>
            <tr>
                <th class='th-style' style='display: flex; width: 100%;' ><strong>Pemilik</strong></th>
                <td class='td-style'>: ${pengajuanData.Lokasi.atasnama}</td>

            </tr>
            <tr style='border-bottom: 5px solid;'>
                <th>
                </th>
                <td>
                </td>
            </tr>
                </table>
        `; // Adjust this based on your data structure
        return formattedData;
    };

    return (
        <Button style={{ marginRight: '10px'  }} variant='success' onClick={fetchPengajuan}>
            Lihat
        </Button>
    )
}

export default ButtonLihatPengajuanDetail