import React, { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom';
import { Navbar, Nav, Offcanvas, Container } from 'react-bootstrap'
import Cookies from 'js-cookie';
import Swal from 'sweetalert2'
import './NavigationBar.css';
import logoImage from '../Asset/cropped-logo-kota-tegal.png'

const NavigationBar = () => {
    const [showOffcanvas, setShowOffcanvas] = useState(false)

    const toggleOffcanvas = (expand) => {
        setShowOffcanvas(!showOffcanvas[expand]);
    };

    const navigate = useNavigate();

    document.addEventListener('DOMContentLoaded', () => {
        const navItems = document.querySelectorAll('.full-hover');
    
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navItems.forEach(navItem => navItem.classList.remove('active'));
                item.classList.add('active');
            });
        });
    });
    
    const exitDialog = () => {
        Swal.fire({
            title: "Anda Mau Keluar?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak"
        }).then((result) => {
            if (result.isConfirmed) {
                navigate("/");
                Cookies.remove('token');
                Swal.fire({
                    title: "Anda Berhasil Keluar!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 3000
                });
            }
        });
    };

    return (
        <>
            {['sm'].map((expand) => (
                <Navbar key={expand} expand={expand} className='Navigation sticky-top' >
                    <Container fluid >
                        <Navbar.Brand href="#" ><img src={logoImage} alt="Dinas Pekerjaan Umum dan Penataan Ruang Kota Tegal" /></Navbar.Brand>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} onClick={() => toggleOffcanvas(expand)} />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                            style={{ backgroundColor: '#FFC413', width: '60%' }}
                            show={showOffcanvas}
                            onHide={() => setShowOffcanvas(false)}
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>

                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body >
                                <Nav  >
                                    <NavLink to="/Dashboard" className={`${showOffcanvas ? 'offcanvas-hover' : 'full-hover'} `} >
                                        <span className='nav-text'>Dashboard</span>
                                    </NavLink>
                                    <NavLink to='/pengajuan' className={`${showOffcanvas ? 'offcanvas-hover' : 'full-hover'} `} >
                                        <span className='nav-text'>Pengajuan</span>
                                    </NavLink>
                                    <NavLink to='/lokasi' className={`${showOffcanvas ? 'offcanvas-hover' : 'full-hover'}`}>
                                        <span className='nav-text'>Lokasi</span>
                                    </NavLink>
                                    <NavLink to='/berkas' className={`${showOffcanvas ? 'offcanvas-hover' : 'full-hover'}`}>
                                        <span className='nav-text'>Berkas</span>
                                    </NavLink>
                                    <NavLink to='/user-profil' className={`${showOffcanvas ? 'offcanvas-hover' : 'full-hover'}`}>
                                        <span className='nav-text'>Profil</span>
                                    </NavLink>
                                    <NavLink onClick={exitDialog} className={`${showOffcanvas ? 'offcanvas-hover' : 'exit-btn'}`}>
                                        <span className='nav-text'>Keluar</span>
                                    </NavLink>
                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}

        </>
    )
}

export default NavigationBar