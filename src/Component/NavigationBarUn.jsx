import React, { useState } from 'react'
import { Navbar, Nav, Offcanvas, Container } from 'react-bootstrap'
import './NavigationBar.css';
import { NavLink } from 'react-router-dom';

const NavigationBarUn = () => {
    const [showOffcanvas, setShowOffcanvas] = useState(false)

    const toggleOffcanvas = (expand) => {
        setShowOffcanvas(!showOffcanvas[expand]);
    };


    return (
        <>
            {['sm'].map((expand) => (
                <Navbar key={expand} expand={expand} className='Navigation sticky-top' > 
                    <Container fluid >
                        <Navbar.Brand href="/" ><img src="https://dpupr.tegalkota.go.id/wp-content/uploads/2021/11/cropped-logo-kota-tegal.png" alt="Dinas Pekerjaan Umum dan Penataan Ruang Kota Tegal"/></Navbar.Brand>
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
                                    <NavLink to="/About" className={`${showOffcanvas ? 'offcanvas-hover' : 'full-hover'} `} >
                                        <span className='nav-text'>About</span>
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

export default NavigationBarUn