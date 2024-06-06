import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import axios from 'axios'
import './ButtonPengajuanProses.css';
import Swal from 'sweetalert2';

const ButtonPengajuanProses = ({ dataId }) => {
    const backendUrl = process.env.REACT_APP_ENDPOINT

    const [apiSuccess, setApiSuccess] = useState(false);

    const handleFetch = async () => {

        try {
            // ambil token dari cookie
            const token = document.cookie.replace(/(?:^|.*;\s*)token\s*=\s*([^;]*).*$|^.*$/, "$1");
            //set cookie as header
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const responsePengajuan = await axios.get(`${backendUrl}/admin/getoneaccpengajuan/${dataId}`, config)
            const allData = responsePengajuan.data
            const responseBerkas = await axios.get(`${backendUrl}/admin/allspecfile/${dataId}`, config)
            const allFileData = responseBerkas.data

            Swal.fire({
                title: 'Data pengajuan',
                html: renderFetchedPengajuan(allData, allFileData),
                icon: 'info',
                confirmButtonText: 'Kirim',
                confirmButtonColor: '#00aa0e',
                showCancelButton: true,
                cancelButtonText: 'Batal',
                width: '80%',
                preConfirm: () => {
                    const noreg = document.getElementById('noreg').value;
                    const notes = document.getElementById('notes').value;
            
                    // Custom validation logic
                    if (noreg && notes) {
                        Swal.showValidationMessage('Jika sudah mengisi nomor registrasi, catatan tidak boleh diisi. begitupula sebaliknya');
                        return false;
                    }
            
                    return [noreg, notes];
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    handlePostData(result.value);
                    console.log(result.value);
                }
            });
            
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Data Pengajuan',
                html: 'Data Tidak Ditemukan gan',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };

    const handlePostData = async (formData) => {
        const [
            noreg,
            notes,
        ] = formData;

        let data 

        // conditioal storing
        if(!noreg){
            data = {
                notes,
                noreg:null
            }
        }else{
            data = {
                noreg,
                notes:null
            } 
        }



        try {
            // ambil token dari cookie
            const token = document.cookie.replace(/(?:^|.*;\s*)token\s*=\s*([^;]*).*$|^.*$/, "$1");
            //set cookie as header
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const response = await axios.patch(`${backendUrl}/admin/pengajuan/${dataId}`, data, config);
            console.log('Data posted successfully:', response.data);

            setApiSuccess(true);
                        
            Swal.fire({
                icon: 'success',
                text: 'Data Behasil di input',
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

    };

    useEffect(() => {
        if (apiSuccess) {
            window.location.reload();
        }
    }, [apiSuccess]);


    const renderFetchedPengajuan = (pengajuanData, berkasData) => {
        if (pengajuanData.length === 0) {
            return '<p>No data Found</p>';
        }

        //mapping berkas dulu
        const renderBerkas = () => {
            if (!berkasData || berkasData.length === 0) {
                return '<tr><td colspan="3">No Berkas available</td></tr>';
            }

            let berkasHTML = '';
            berkasData.forEach((item, index) => {
                berkasHTML += `
                    <tr>
                        <td>${item.name}</td>
                        <td><a href="https://docs.google.com/viewer?url=${encodeURIComponent(item.url)}" target="_blank" rel="noreferrer">Lihat Berkas</a></td>
                    </tr>
                `;
            });
            return berkasHTML;
        };


        // Format pengajuan data as needed
        const formattedData = `
        <table>
                <tr>
                    <th class='th-style' style='display: flex; width: 50%;' ><strong>Nomer Registrasi</strong></th>
                    <td class='td-style'>: <input id='noreg' style='width: 90%; border: none; border-bottom: 2px solid;' type='text' value='${pengajuanData.noreg ?? ''}' /></td>

                </tr>
                <tr>
                    <th class='th-style' style='display: flex; width: 50%;' ><strong>Catatan</strong></th>
                    <td class='td-style'>: <input id='notes' style='width: 90%; border: none; border-bottom: 2px solid;' type='text' value='${pengajuanData.notes ?? ''}' /></td>
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
                        <th class='th-style' style='display: flex; width: 50%;' ><strong>Alamat Pengaju</strong></th>
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

                 <tr style='border-bottom: 5px solid;'>
                    <th >Berkas</th>
                </tr>
                <tr>
                    <th>Nama Berkas</th>
                    <th>Link</th>
                </tr>
                    <tr>
                    ${renderBerkas()}
                    </tr>
                </table>
        `; // Adjust this based on your data structure
        return formattedData;
    };



    return (
        <>
            <Button onClick={handleFetch} variant="success">
                Lihat
            </Button>
        </>
    )
}

export default ButtonPengajuanProses