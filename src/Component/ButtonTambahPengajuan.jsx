import React, { useEffect, useState } from 'react'
import { useSpring, animated } from 'react-spring'
import './ButtonTambah.css'
import addIcon from '../Asset/add.png'
import Swal from 'sweetalert2'
import axios from 'axios';

const ButtonTambahPengajuan = () => {
    const [clicked, setClicked] = useState(false);
    const [apiSuccess, setApiSuccess] = useState(false);

    const buttonSpring = useSpring({
        transform: clicked ? 'scale(0.95)' : 'scale(1)' // Apply scaling based on click state
    });

    const handleButtonClick = () => {
        Swal.fire({
            title: 'Masukkan Data',
            html: ` <table>
                    <tr>
                        <th class='th-style' style='display: flex; width: 100%;'><strong>Tanggal</strong></th>
                        <td>: <input id='tanggal' style='width: 90%; border: none; border-bottom: 2px solid;' type='date'/></td>

                    </tr>
                    <tr>
                        <th class='th-style' style='display: flex; width: 100%;' ><strong>Nama Pengaju</strong></th>
                        <td>: <input id='namep' style='width: 90%; border: none; border-bottom: 2px solid;' type='text'/></td>

                    </tr>
                    <tr>
                        <th class='th-style' style='display: flex; width: 100%;' ><strong>Nama Pemohon 1</strong></th>
                        <td>: <input id='namep1' style='width: 90%; border: none; border-bottom: 2px solid;' type='text'/></td>

                    </tr>
                    <tr>
                        <th class='th-style' style='display: flex; width: 100%;'><strong>Nama Pemohon 2</strong></th>
                        <td>: <input id='namep2' style='width: 90%; border: none; border-bottom: 2px solid;' type='text'/></td>

                    </tr>
                    <tr>
                        <th class='th-style' style='display: flex; width: 100%;'><strong>NIK Pemohon 1</strong></th>
                        <td>: <input id='nikp1' style='width: 90%; border: none; border-bottom: 2px solid;' type='text'/></td>

                    </tr>
                    <tr>
                        <th class='th-style' style='display: flex; width: 100%;' ><strong>NIK Pemohon 2</strong></th>
                        <td>: <input id='nikp2' style='width: 90%; border: none; border-bottom: 2px solid;' type='text'/></td>

                    </tr>
                    <tr>
                        <th class='th-style' style='display: flex; width: 100%;' ><strong>No. Telp</strong></th>
                        <td>: <input id='telp' style='width: 90%; border: none; border-bottom: 2px solid;' type='text'/></td>

                    </tr>
                    <tr>
                        <th class='th-style' style='display: flex; width: 100%;' ><strong>Alamat Pengaju</strong></th>
                        <td>: <input id='alamat' style='width: 90%; border: none; border-bottom: 2px solid;' type='text'/></td>

                    </tr>
                    <tr>
                        <th class='th-style' style='display: flex; width: 100%;' ><strong>Rt</strong></th>
                        <td>: <input id='rt' style='width: 90%; border: none; border-bottom: 2px solid;' type='text'/></td>

                    </tr>
                    <tr>
                        <th class='th-style' style='display: flex; width: 100%;' ><strong>Rw</strong></th>
                        <td>: <input id='rw' style='width: 90%; border: none; border-bottom: 2px solid;' type='text'/></td>

                    </tr>
                    <tr>
                        <th class='th-style' style='display: flex; width: 100%;' ><strong>Kelurahan</strong></th>
                        <td>: 
                            <select id='kelurahan' style='width: 90%; border: none; border-bottom: 2px solid;'>
                                <option value=''>Masukkan Kelurahan</option>
                                <option value='kelurahan1'>Kelurahan 1</option>
                                <option value='kelurahan2'>Kelurahan 2</option>

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
                        <th class='th-style' style='display: flex; width: 100%;' ><strong>Kota</strong></th>
                        <td>: <input id='kota' style='width: 90%; border: none; border-bottom: 2px solid;' type='text'/></td>

                    </tr>
                </table>`,
            width: '90%',
            icon: 'question',
            confirmButtonText: 'Kirim',
            confirmButtonColor: '#00aa0e',
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
                handlePostData(result.value);
                console.log(result.value);
            }
        });
    };

    const handlePostData = async (formData) => {
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

            const response = await axios.post('http://localhost:3000/pengajuan/create', data, config);
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

export default ButtonTambahPengajuan