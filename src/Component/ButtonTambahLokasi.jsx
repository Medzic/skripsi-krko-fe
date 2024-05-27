import React, { useEffect, useState } from 'react'
import { useSpring, animated } from 'react-spring'
import { useNavigate } from 'react-router-dom'
import './ButtonTambah.css'
import addIcon from '../Asset/add.png'
import Swal from 'sweetalert2'
import axios from 'axios';

const ButtonTambahLokasi = () => {
    const [clicked, setClicked] = useState(false);
    const [apiSuccess, setApiSuccess] = useState(false);
    const navigate = useNavigate();

    const buttonSpring = useSpring({
        transform: clicked ? 'scale(0.95)' : 'scale(1)' // Apply scaling based on click state
    });

    const [data, setData] = useState([]);

    useEffect(() => {
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

                const response = await axios.get('http://localhost:3000/pengajuan', config)
                setData(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchPengajuan();
    }, [])


    const handleButtonClick = () => {
        Swal.fire({
            title: 'Masukkan Lokasi',
            html: renderFetchedPengajuan(data),
            width: '90%',
            icon: 'question',
            confirmButtonText: 'Kirim',
            confirmButtonColor: '#00aa0e',
            showCancelButton: true,
            cancelButtonText: 'Batal',
            didOpen: () => {
                const confirmButton = Swal.getConfirmButton();
                confirmButton.disabled = true;

                if (data.length > 0) {
                    confirmButton.disabled = false;
                }
            },
            preConfirm: () => {
                const pengajuanId = document.getElementById('pengajuanId').value;
                const loktanah = document.getElementById('loktanah').value;
                const rt = document.getElementById('rt').value;
                const rw = document.getElementById('rw').value;
                const kelurahan = document.getElementById('kelurahan').value;
                const kecamatan = document.getElementById('kecamatan').value;
                const keperluan = document.getElementById('keperluan').value;
                const stanah = document.getElementById('stanah').value;
                const nocert = document.getElementById('nocert').value;
                const luas = document.getElementById('luas').value;
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
                if (!luas) {
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
                handlePostData(result.value);
                console.log(result.value);
            }
        });
    };

    const renderFetchedPengajuan = (pengajuanData) => {
        if (pengajuanData.length === 0) {
            navigate('/pengajuan')
            return '<p>Silahkan Buat Pengajuan Terlebih Dahulu</p>';
        }

        // Format pengajuan data as needed
        const formattedData = `
        <table>
                    <tr>
                        <th class='th-style' style='display: flex; width: 100%;'><strong>Pengajuan</strong></th>
                        <td class='td-style'>: 
                            <select style=' width: 90%;' id='pengajuanId' >
                                <option value='' >Pilih Pengajuan</option>
                                ${pengajuanData.filter((data) => data.Lokasi === null).map((item) =>
            `<option value=${item.id}>${item.namep}</option>`
        ).join('')}
                            </select>
                        </td>

                    </tr>
                    <tr>
                        <th class='th-style' style='display: flex; width: 50%;' ><strong>Lokasi Tanah</strong></th>
                        <td class='td-style'>: <input id='loktanah' style='width: 90%; border: none; border-bottom: 2px solid;' type='text'/></td>

                    </tr>
                    <tr>
                        <th class='th-style' style='display: flex; width: 50%;' ><strong>Rt</strong></th>
                        <td class='td-style'>: <input id='rt' style='width: 90%; border: none; border-bottom: 2px solid;' type='text'/></td>

                    </tr>
                    <tr>
                        <th class='th-style' style='display: flex; width: 50%;'><strong>Rw</strong></th>
                        <td class='td-style'>: <input id='rw' style='width: 90%; border: none; border-bottom: 2px solid;' type='text'/></td>

                    </tr>
                    <tr>
                    <th class='th-style' style='display: flex; width: 100%;' ><strong>Kelurahan</strong></th>
                    <td>: 
                        <select id='kelurahan' style='width: 90%; border: none; border-bottom: 2px solid;'>
                            <option value=''>Masukkan Kelurahan</option>
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
                    <th class='th-style' style='display: flex; width: 100%;' ><strong>Kecamatan</strong></th>
                    <td>: 
                        <select id='kecamatan' style='width: 90%; border: none; border-bottom: 2px solid;'>
                            <option value=''>Masukkan Kecamatan</option>
                            <option value='Tegal Barat'>Tegal Barat</option>
                            <option value='Tegal Timur'>Tegal Timur</option>
                            <option value='Tegal Selatan'>Tegal Selatan</option>
                            <option value='Margadana'>Margadana</option>

                        </select>
                    </td>
                    </tr>
                    <tr>
                        <th class='th-style' style='display: flex; width: 50%;' ><strong>Keperluan</strong></th>
                        <td class='td-style'>: <input id='keperluan' style='width: 90%; border: none; border-bottom: 2px solid;' type='text'/></td>

                    </tr>
                    <tr>
                        <th class='th-style' style='display: flex; width: 50%;' ><strong>Sertifikat Tanah</strong></th>
                        <td class='td-style'>: <input id='stanah' style='width: 90%; border: none; border-bottom: 2px solid;' type='text'/></td>

                    </tr>
                    <tr>
                        <th class='th-style' style='display: flex; width: 50%;' ><strong>Nomor Sertifikat</strong></th>
                        <td class='td-style'>: <input id='nocert' style='width: 90%; border: none; border-bottom: 2px solid;' type='text'/></td>

                    </tr>
                    <tr>
                        <th class='th-style' style='display: flex; width: 50%;' ><strong>Luas Tanah</strong></th>
                        <td class='td-style'>: <input id='luas' style='width: 90%; border: none; border-bottom: 2px solid;' type='text'/></td>

                    </tr>
                    <tr>
                        <th class='th-style' style='display: flex; width: 50%;' ><strong>Pemilik</strong></th>
                        <td class='td-style'>: 
                        <input id='atasnama' style='width: 90%; border: none; border-bottom: 2px solid;' type='text'/>
                        </td>

                    </tr>
                </table>
        `; // Adjust this based on your data structure
        return formattedData;
    };

    const handlePostData = async (formData) => {
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


            const response = await axios.post('http://localhost:3000/lokasi/create', data, config);
            console.log('Data posted successfully:', response.data);

            if (data.length === 0) {
                return Swal.fire({
                    icon: 'error',
                    text: 'data Tidak boleh kosong',
                    timer: 3000
                })
            }

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
                text: 'Data Tidak boleh Kosong',
                timer: 3000
            })
        }

    };

    useEffect(() => {
        if (apiSuccess) {
            window.location.reload();
        }
    }, [apiSuccess]);


    return (
        <>
            <animated.button
                className="button-item"
                style={buttonSpring}
                onMouseDown={() => setClicked(true)}
                onMouseUp={() => setClicked(false)}
                onClick={handleButtonClick}
            >
                <img src={addIcon} alt='tambah' className="button-icon" />
                <h1 className='button-text'>Tambah</h1>
            </animated.button>
        </>

    );
};

export default ButtonTambahLokasi