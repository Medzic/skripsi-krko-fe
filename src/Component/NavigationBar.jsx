import React, { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom';
import { Navbar, Nav, Offcanvas, Container } from 'react-bootstrap'
import Cookies from 'js-cookie';
import Swal from 'sweetalert2'
import './NavigationBar.css';

const NavigationBar = () => {
    const [showOffcanvas, setShowOffcanvas] = useState(false)

    const toggleOffcanvas = (expand) => {
        setShowOffcanvas(!showOffcanvas[expand]);
    };

    const navigate = useNavigate();

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
                Cookies.remove('token');
                navigate("/Auth");
                Swal.fire({
                    title: "Anda Berhasil Keluar!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 3000
                });
            }
        });
    }

    return (
        <>
            {['sm'].map((expand) => (
                <Navbar key={expand} expand={expand} className='Navigation sticky-top' >
                    <Container fluid >
                        <Navbar.Brand href="#" ><img src="https://dpupr.tegalkota.go.id/wp-content/uploads/2021/11/cropped-logo-kota-tegal.png" alt="Dinas Pekerjaan Umum dan Penataan Ruang Kota Tegal" /></Navbar.Brand>
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
                                    <NavLink to="/" className={`${showOffcanvas ? 'offcanvas-hover' : 'full-hover'} `} >
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
                                    <NavLink onClick={exitDialog} className={`${showOffcanvas ? 'offcanvas-hover' : 'full-hover'}`}>
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