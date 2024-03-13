import React, { useState } from 'react'
import { Navbar, Nav, Offcanvas, Container } from 'react-bootstrap'
import './NavigationBar.css';

const NavigationBar = () => {
    const [showOffcanvas, setShowOffcanvas] = useState(false)

    const toggleOffcanvas = (expand) => {
        setShowOffcanvas(!showOffcanvas[expand]);
    };


    return (
        <>
            {['sm'].map((expand) => (
                <Navbar key={expand} expand={expand} className='Navigation sticky-top' > 
                    <Container fluid >
                        <Navbar.Brand href="#" >Navbar Offcanvas</Navbar.Brand>
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
                                    <Nav.Link href="/" className={`${showOffcanvas ? 'offcanvas-hover' : 'full-hover'} `} >
                                        <span className='nav-text'>Dashboard</span>
                                    </Nav.Link>
                                    <Nav.Link href='/pengajuan' className={`${showOffcanvas ? 'offcanvas-hover' : 'full-hover'} `} >
                                        <span className='nav-text'>Pengajuan</span>
                                    </Nav.Link>
                                    <Nav.Link href='/lokasi' className={`${showOffcanvas ? 'offcanvas-hover' : 'full-hover'}`}>
                                        <span className='nav-text'>Lokasi</span>
                                    </Nav.Link>
                                    <Nav.Link href='/berkas' className={`${showOffcanvas ? 'offcanvas-hover' : 'full-hover'}`}>
                                        <span className='nav-text'>Berkas</span>
                                    </Nav.Link>
                                    <Nav.Link className={`${showOffcanvas ? 'offcanvas-hover' : 'full-hover'}`}>
                                        <span className='nav-text'>Keluar</span>
                                    </Nav.Link>
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