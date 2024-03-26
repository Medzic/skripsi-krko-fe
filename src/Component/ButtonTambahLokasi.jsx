import React, { useEffect, useState } from 'react'
import { useSpring, animated } from 'react-spring'
import './ButtonTambah.css'
import addIcon from '../Asset/add.png'
import Swal from 'sweetalert2'
import axios from 'axios';

const ButtonTambahLokasi = () => {
    const [clicked, setClicked] = useState(false);
    const [apiSuccess, setApiSuccess] = useState(false);

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
            title: 'Masukkan Data',
            html: renderFetchedPengajuan(data),
            width: '90%',
            icon: 'question',
            confirmButtonText: 'Kirim',
            confirmButtonColor: '#00aa0e',
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
                handlePostData(result.value);
                console.log(result.value);
            }
        });
    };

    const renderFetchedPengajuan = (pengajuanData) => {
        if (pengajuanData.length === 0) {
            return '<p>No pengajuan data available</p>';
        }

        // Format pengajuan data as needed
        const formattedData = `
        <table>
                    <tr>
                        <th class='th-style' style='display: flex; width: 100%;'><strong>Pengajuan</strong></th>
                        <td class='td-style'>: 
                            <select style=' width: 90%;' id='pengajuanId' >
                                <option value='' >Pilih Pengajuan</option>
                                ${pengajuanData.map((item) =>
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
                        <th class='th-style' style='display: flex; width: 50%;'><strong>Kelurahan</strong></th>
                        <td class='td-style'>: <input id='kelurahan' style='width: 90%; border: none; border-bottom: 2px solid;' type='text'/></td>

                    </tr>
                    <tr>
                        <th class='th-style' style='display: flex; width: 50%;' ><strong>Kecamatan</strong></th>
                        <td class='td-style'>: <input id='kecamatan' style='width: 90%; border: none; border-bottom: 2px solid;' type='text'/></td>

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

            if(data.length === 0){
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