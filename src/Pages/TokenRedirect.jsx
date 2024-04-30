import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import Swal from 'sweetalert2'


export const TokenTrueRedirect = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const redirect = () => {
            try {
                const token = Cookies.get('token');
                if (token) {
                    navigate("/Dashboard");
                    Swal.fire({
                        title: 'Error!',
                        text: 'Token Terdeteksi, Anda Tidak perlu login lagi!',
                        icon: 'error',
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#FF0000',
                    })
                }
            } catch (error) {
                console.error('Error redirecting:', error);
            }
        };

        redirect();
    }, [navigate]);



    return (
        null
    )
}

export const TokenFalseRedirect = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const redirect = () => {
            try {
                const token = Cookies.get('token');
                if (!token) {
                    navigate("/");
                    Swal.fire({
                        title: 'Error!',
                        text: 'silahkan login terlebih dahulu',
                        icon: 'error',
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#FF0000',
                    })
                }
            } catch (error) {
                console.error('Error redirecting:', error);
            }
        };

        redirect();
    }, [navigate]);

    return (
        null
    )
}

export const IsAdminToken = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const redirect = () => {
            try {
                const cookies = document.cookie.split(';');

                let role = null;

                cookies.forEach(cookie => {
                    const cookieParts = cookie.split('=');
                    if (cookieParts.length === 2) {
                        const [key, value] = cookieParts;
                        const trimmedKey = key.trim();
                        const trimmedValue = value.trim();

                        if (trimmedKey === 'role') {
                            role = trimmedValue;
                        }
                    }
                });

                if (role !== 'Admin') {
                    navigate('/*')
                }
            } catch (error) {
                console.error('Error redirecting:', error);
            }

        };
        redirect();
    }, [navigate]);

    return(
        null
    )
}