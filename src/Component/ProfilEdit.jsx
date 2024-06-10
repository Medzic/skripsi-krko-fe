import React, { useEffect, useState } from 'react'
import './Profil.css'
import { AtSign, BookUser, MapPin, Phone, User } from 'lucide-react'
import { Button } from 'react-bootstrap'
import axios from 'axios'
import Swal from 'sweetalert2'

const ProfilEdit = () => {
    const backendUrl = process.env.REACT_APP_ENDPOINT
    const [formData, setFormData] = useState({
        nik: '',
        nama: '',
        email: '',
        telp: '',
        alamat: ''
    });
    const [formChanged, setFormChanged] = useState(false);

    // Fetch user data when component mounts
    const fetchUserData = async () => {
        try {
            const token = document.cookie.replace(/(?:^|.*;\s*)token\s*=\s*([^;]*).*$|^.*$/, "$1");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const response = await axios.get(`${backendUrl}/getUser`, config);
            setFormData({
                nik: response.data.nik,
                nama: response.data.nama,
                email: response.data.email,
                telp: response.data.telp,
                alamat: response.data.alamat
            });
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
        setFormChanged(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        Swal.fire({
            icon: 'info',
            title: 'Loading...',
            allowOutsideClick: false,
            showCancelButton: false,
            showConfirmButton: false
        });
        
        try {
            const token = document.cookie.replace(/(?:^|.*;\s*)token\s*=\s*([^;]*).*$|^.*$/, "$1");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const response = await axios.put(`${backendUrl}/updateUser`, formData, config);
            console.log('User data updated:', response.data);
            Swal.fire({
                icon: 'success',
                text: 'Data Behasil di input',
                timer: 3000
            })
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
            <h3 className='title-profil'>Edit Data User</h3>
            <form className='form-edit' onSubmit={handleSubmit}>
                <div>

                    <h5>
                        <label htmlFor='nik'>NIK</label>
                    </h5>
                    <BookUser />
                    <input
                        type='number'
                        id='nik'
                        placeholder='NIK'
                        className='form-input'
                        value={formData.nik}
                        onChange={handleChange}
                    />

                </div>
                <div>
                    <h5>
                        <label htmlFor='nama'>Username</label>
                    </h5>
                    <User />
                    <input
                        type='text'
                        id='nama'
                        placeholder='Nama'
                        className='form-input'
                        value={formData.nama}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <h5>
                        <label htmlFor='email'>Email</label>
                    </h5>
                    <AtSign />
                    <input
                        type='email'
                        id='email'
                        placeholder='Email'
                        className='form-input'
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <h5>
                        <label htmlFor='telp'>Telepon</label>
                    </h5>
                    <Phone />
                    <input
                        type='number'
                        id='telp'
                        placeholder='No. Telepon'
                        className='form-input'
                        value={formData.telp}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <h5>
                        <label htmlFor='alamat'>Alamat</label>
                    </h5>
                    <MapPin />
                    <input
                        type='Text'
                        id='alamat'
                        placeholder='Alamat'
                        className='form-input'
                        value={formData.alamat}
                        onChange={handleChange}
                    />
                </div>
                <Button variant='success' type='submit' disabled={!formChanged}>Edit</Button>
            </form>
        </div>
    )
}

export default ProfilEdit