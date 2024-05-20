import React, { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import './Auth.css'
import { AtSign, User } from 'lucide-react';

const AuthAdmin = () => {
    const [nama, setNama] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/admin/login', {
                nama: nama,
                password: password
            });

            const { data } = response

            if (!data.token) {
                console.error('no token received')
            }
            Cookies.set('token', data.token, { expires: 1 / 24 });
            Cookies.set('role', data.role, { expires: 1 / 24 });


            Swal.fire({
                icon: "success",
                title: "Anda Berhasil Login",
                showConfirmButton: false,
                timer: 3000
            });
            return navigate("/Dashboard-Admin");
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: '#FF0000',
            })
        }
    };


    return (
        <div className='Auth-Wrapper'>
            <h3 className="Auth-Title">Login Admin</h3>
            <p className="Auth-Subtitle">Silahkan masukkan data diri anda</p>

            <form onSubmit={handleLogin}>
                <div className="form">
                    <User/>
                    <input
                        type="nama"
                        id="nama"
                        placeholder="Nama"
                        className='form-input'
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                    />
                    <AtSign/>
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        className='form-input'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button className='form-button' type="submit">Masuk</button>
            </form>

        </div>




    )
}

export default AuthAdmin