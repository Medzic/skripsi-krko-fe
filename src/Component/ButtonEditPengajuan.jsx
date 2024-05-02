import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import Button from 'react-bootstrap/Button'


const ButtonEditPengajuan = ({ onSuccess, onText }) => {
    const [apiSuccess, setApiSuccess] = useState(false);

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
                confirmButtonText: 'Edit',
                confirmButtonColor: '#00aa0e',
                width: '90%',
                showCancelButton: true,
                cancelButtonText: 'Batal',
                preConfirm: () => {
                    return [
                        document.getElementById('tanggal').value,
                        document.getElementById('namep').value,
                        document.getElementById('namep1').value,
                        document.getElementById('namep2').value,
                        document.getElementById('nikp1').value,
                        document.getElementById('nikp2').value,
                        document.getElementById('telp').value,
                        document.getElementById('alamat').value,
                        document.getElementById('rt').value,
                        document.getElementById('rw').value,
                        document.getElementById('kelurahan').value,
                        document.getElementById('kecamatan').value,
                        document.getElementById('kota').value,
                    ]
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    editPengajuan(result.value);
                    console.log(result.value);
                }
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
        if (pengajuanData.length === 0) {
            return '<p>No pengajuan data available</p>';
        }

        // Format pengajuan data as needed
        const formattedData = `
        <table>
                    <tr>
                        <th class='th-style' style='display: flex; width: 50%;'><strong>Tanggal</strong></th>
                        <td class='td-style'>: <input id='tanggal' style='width: 90%; border: none; border-bottom: 2px solid;' type='date' value='${pengajuanData.tanggal ?? ''}' /> </td>
                    </tr>
                    <tr>
                        <th class='th-style' style='display: flex; width: 50%;' ><strong>Nama Pengaju</strong></th>
                        <td class='td-style'>: <input id='namep' style='width: 90%; border: none; border-bottom: 2px solid;' type='text' value='${pengajuanData.namep ?? ''}' /></td>

                    </tr>
                    <tr>
                        <th class='th-style' style='display: flex; width: 50%;' ><strong>Nama Pemohon 1</strong></th>
                        <td class='td-style'>: <input id='namep1' style='width: 90%; border: none; border-bottom: 2px solid;' type='text' value='${pengajuanData.namep1 ?? ''}' /></td>

                    </tr>
                    <tr>
                        <th class='th-style' style='display: flex; width: 50%;'><strong>Nama Pemohon 2</strong></th>
                        <td class='td-style'>: <input id='namep2' style='width: 90%; border: none; border-bottom: 2px solid;' type='text' value='${pengajuanData.namep2 ?? ''}' /></td>

                    </tr>
                    <tr>
                        <th class='th-style' style='display: flex; width: 50%;'><strong>NIK Pemohon 1</strong></th>
                        <td class='td-style'>: <input id='nikp1' style='width: 90%; border: none; border-bottom: 2px solid;' type='text' value='${pengajuanData.nikp1 ?? ''}' /></td>

                    </tr>
                    <tr>
                        <th class='th-style' style='display: flex; width: 50%;' ><strong>NIK Pemohon 2</strong></th>
                        <td class='td-style'>: <input id='nikp2' style='width: 90%; border: none; border-bottom: 2px solid;' type='text' value='${pengajuanData.nikp2 ?? ''}' /></td>

                    </tr>
                    <tr>
                        <th class='th-style' style='display: flex; width: 50%;' ><strong>No. Telp</strong></th>
                        <td class='td-style'>: <input id='telp' style='width: 90%; border: none; border-bottom: 2px solid;' type='text' value='${pengajuanData.telp ?? ''}' /></td>

                    </tr>
                    <tr>
                        <th class='th-style' style='display: flex; width: 50%;' ><strong>Alamat Pengaju</strong></th>
                        <td class='td-style'>: <input id='alamat' style='width: 90%; border: none; border-bottom: 2px solid;' type='text' value='${pengajuanData.alamat ?? ''}' /></td>

                    </tr>
                    <tr>
                        <th class='th-style' style='display: flex; width: 50%;' ><strong>Rt</strong></th>
                        <td class='td-style'>: <input id='rt' style='width: 90%; border: none; border-bottom: 2px solid;' type='text' value='${pengajuanData.rt ?? ''}' /></td>

                    </tr>
                    <tr>
                        <th class='th-style' style='display: flex; width: 50%;' ><strong>Rw</strong></th>
                        <td class='td-style'>: <input id='rw' style='width: 90%; border: none; border-bottom: 2px solid;' type='text' value='${pengajuanData.rw ?? ''}' /></td>

                    </tr>
                    <tr>
                        <th class='th-style' style='display: flex; width: 50%;' ><strong>Kelurahan</strong></th>
                        <td class='td-style'>: <input id='kelurahan' style='width: 90%; border: none; border-bottom: 2px solid;' type='text' value='${pengajuanData.kelurahan ?? ''}' />
                        </td>

                    </tr>
                    <tr>
                        <th class='th-style' style='display: flex; width: 50%;' ><strong>Kecamatan</strong></th>
                        <td class='td-style'>: <input id='kecamatan' style='width: 90%; border: none; border-bottom: 2px solid;' type='text' value='${pengajuanData.kecamatan ?? ''}' />
                        </td>

                    </tr>
                    <tr>
                        <th class='th-style' style='text-align: left; width: 50%;' ><strong>Kota</strong></th>
                        <td class='td-style' >: <input id='kota' style='width: 90%; border: none; border-bottom: 2px solid;' type='text' value='${pengajuanData.kota ?? ''}' /></td>

                    </tr>
                </table>
        `; 
        return formattedData;
    };

    const editPengajuan = async (formData) => {
        const [
            tanggal,
            namep,
            namep1,
            namep2,
            nikp1,
            nikp2,
            telp,
            alamat,
            rt,
            rw,
            kelurahan,
            kecamatan,
            kota
        ] = formData;

        const data = {
            tanggal,
            namep,
            namep1,
            namep2,
            nikp1,
            nikp2,
            telp,
            alamat,
            rt,
            rw,
            kelurahan,
            kecamatan,
            kota
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

            const response = await axios.put(`http://localhost:3000/pengajuan/edit/${onSuccess}`, data, config)
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
        <Button variant='warning' onClick={fetchPengajuan}>
            {onText ? onText:Text}
        </Button>
    )
}

export default ButtonEditPengajuan