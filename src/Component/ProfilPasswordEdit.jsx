import axios from 'axios';
import { KeyRound } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import Swal from 'sweetalert2';

const ProfilPasswordEdit = () => {
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = document.cookie.replace(/(?:^|.*;\s*)token\s*=\s*([^;]*).*$|^.*$/, "$1");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            await axios.put('http://localhost:3000/updatePassword', formData, config); 
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
            <h3 className='title-profil'>Edit Password</h3>
            <form className='form-edit' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='passwordBefore'>Password Sekarang</label>
                    <div>
                        <KeyRound />
                        <input
                            type='password'
                            id="oldPassword"
                            placeholder="Password Sekarang"
                            className='form-input'
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor='passwordAfter'>Password Baru</label>
                    <div>
                        <KeyRound />
                        <input
                            type='password'
                            id="newPassword"
                            placeholder="Password Baru"
                            className='form-input'
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <Button variant='success' type='submit'>Edit</Button>
            </form>
        </div>
    )
}

export default ProfilPasswordEdit