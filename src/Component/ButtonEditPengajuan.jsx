import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import Button from 'react-bootstrap/Button'


const ButtonEditPengajuan = ({ onSuccess, onText }) => {
    const backendUrl = process.env.REACT_APP_ENDPOINT

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

            const response = await axios.get(`${backendUrl}/pengajuan/${onSuccess}`, config)
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
                    const tanggal = document.getElementById('tanggal').value
                    const namep1 = document.getElementById('namep1').value
                    const namep2 = document.getElementById('namep2').value
                    const namep3 = document.getElementById('namep3').value
                    const nikp1 = document.getElementById('nikp1').value
                    const nikp2 = document.getElementById('nikp2').value
                    const telp = document.getElementById('telp').value
                    const alamat = document.getElementById('alamat').value
                    const rt = document.getElementById('rt').value
                    const rw = document.getElementById('rw').value
                    const kelurahan = document.getElementById('kelurahan').value
                    const kecamatan = document.getElementById('kecamatan').value
                    const kota = document.getElementById('kota').value

                    if (!namep1) {
                        Swal.showValidationMessage('Data tidak boleh Kosong');
                        return false;
                    }
                    if (nikp1.length !== 16) {
                        Swal.showValidationMessage('Jumlah NIK harus 16 digit.');
                        return false;
                    }
                    if (!telp) {
                        Swal.showValidationMessage('Data tidak boleh Kosong');
                        return false;
                    }
                    if (!alamat) {
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
                    if (!kota) {
                        Swal.showValidationMessage('Data tidak boleh Kosong');
                        return false;
                    }
                    return [
                        tanggal,
                        namep1,
                        namep2,
                        namep3,
                        nikp1,
                        nikp2,
                        telp,
                        alamat,
                        rt,
                        rw,
                        kelurahan,
                        kecamatan,
                        kota,
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
                        <th class='th-style' style='display: flex; width: 50%;' ><strong>Nama Pemohon 1</strong></th>
                        <td class='td-style'>: <input id='namep1' style='width: 90%; border: none; border-bottom: 2px solid;' type='text' placeholder='masukkan nama pemohon apabila memohon untuk diri sendiri' value='${pengajuanData.namep1 ?? ''}' /></td>

                    </tr>
                    <tr>
                        <th class='th-style' style='display: flex; width: 50%;'><strong>Nama Pemohon 2</strong></th>
                        <td class='td-style'>: <input id='namep2' style='width: 90%; border: none; border-bottom: 2px solid;' type='text' placeholder='masukkan nama pemohon lain apabila mewakilkan permohonan' value='${pengajuanData.namep2 ?? ''}' /></td>

                    </tr>
                    <tr>
                        <th class='th-style' style='display: flex; width: 50%;'><strong>Pemohon > 3</strong></th>
                        <td class='td-style'>: <select id='namep3' style='width: 90%; border: none; border-bottom: 2px solid;'>
                        <option value='${pengajuanData.namep3}'>${pengajuanData.namep3 !== " " ? 'Ya' : 'Tidak'}</option>
                        <option value='cs'>Ya</option>
                        <option value=' '>Tidak</option>
                        </select>
                        </td>

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
                        <th class='th-style' style='display: flex; width: 50%;' ><strong>Alamat Pemohon</strong></th>
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
                        <td class='td-style'>:  
                        <select id='kelurahan' style='width: 90%; border: none; border-bottom: 2px solid;'>
                        <option value='${pengajuanData.kelurahan}'>${pengajuanData.kelurahan}</option>
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
                        <th class='th-style' style='display: flex; width: 50%;' ><strong>Kecamatan</strong></th>
                        <td class='td-style'>: 
                        <select id='kecamatan' style='width: 90%; border: none; border-bottom: 2px solid;'>
                        <option value='${pengajuanData.kecamatan}'>${pengajuanData.kecamatan}</option>
                        <option value='Tegal Barat'>Tegal Barat</option>
                        <option value='Tegal Timur'>Tegal Timur</option>
                        <option value='Tegal Selatan'>Tegal Selatan</option>
                        <option value='Margadana'>Margadana</option>
                        </select>
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
            namep1,
            namep2,
            namep3,
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
            namep1,
            namep2,
            namep3,
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

        Swal.fire({
            icon: 'info',
            title: 'Loading...',
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
                    Authorization: `Bearer ${token}`
                }
            };

            const response = await axios.put(`${backendUrl}/pengajuan/edit/${onSuccess}`, data, config)
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
            {onText ? onText : Text}
        </Button>
    )
}

export default ButtonEditPengajuan