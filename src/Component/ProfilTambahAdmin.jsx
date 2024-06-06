import axios from 'axios';
import { AtSign, BookUser, KeyRound, MapPin, Phone, User, Users } from 'lucide-react'
import React from 'react'
import { Button } from 'react-bootstrap'
import Swal from 'sweetalert2';

const ProfilTambahAdmin = () => {

    const handleSubmit = async (e) => {
        const backendUrl = process.env.REACT_APP_ENDPOINT

        e.preventDefault();
        try {
            const token = document.cookie.replace(/(?:^|.*;\s*)token\s*=\s*([^;]*).*$|^.*$/, "$1");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const formData = {
                nik: document.getElementById('nikAdmin').value,
                nama: document.getElementById('namaAdmin').value,
                email: document.getElementById('emailAdmin').value,
                telp: document.getElementById('telpAdmin').value,
                alamat: document.getElementById('alamatAdmin').value,
                role: document.getElementById('roleAdmin').value,
                password: document.getElementById('passwordAdmin').value
            };

            await axios.post(`${backendUrl}/admin/register`, formData, config);
            Swal.fire({
                icon: 'success',
                text: 'Data Behasil di input',
                timer: 3000
            })

            document.getElementById('nikAdmin').value = '';
            document.getElementById('namaAdmin').value = '';
            document.getElementById('emailAdmin').value = '';
            document.getElementById('telpAdmin').value = '';
            document.getElementById('alamatAdmin').value = '';
            document.getElementById('roleAdmin').value = '';
            document.getElementById('passwordAdmin').value = '';
        } catch (error) {
            console.error('Error updating user data:', error);
            Swal.fire({
                icon: 'error',
                text: error,
                timer: 3000
            })
        }
    };

    return (
        <div className='container'>
            <h3 className='title-profil'>Tambah Admin</h3>
            <form className='form-edit' >
                <div>
                    <BookUser />
                    <input
                        type='number'
                        id='nikAdmin'
                        placeholder='NIK'
                        className='form-input'
                    />
                </div>
                <div>
                    <User />
                    <input
                        type='text'
                        id='namaAdmin'
                        placeholder='Nama'
                        className='form-input'
                    />
                </div>
                <div>
                    <AtSign />
                    <input
                        type='email'
                        id='emailAdmin'
                        placeholder='Email'
                        className='form-input'
                    />
                </div>
                <div>
                    <Phone />
                    <input
                        type='number'
                        id='telpAdmin'
                        placeholder='No. Telepon'
                        className='form-input'
                    />
                </div>
                <div>
                    <MapPin />
                    <input
                        type='text'
                        id='alamatAdmin'
                        placeholder='Alamat'
                        className='form-input'
                    />
                </div>
                <div>
                    <Users />
                    <select
                        id='roleAdmin'

                        className='form-input'
                    >
                        <option value="" disabled hidden>Role</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <div>
                    <KeyRound />
                    <input
                        type='password'
                        id="passwordAdmin"
                        placeholder="Password"
                        className='form-input'
                    />
                </div>
                <Button variant='success' onClick={handleSubmit}>Tambah</Button>
            </form>
        </div>
    )
}

export default ProfilTambahAdmin