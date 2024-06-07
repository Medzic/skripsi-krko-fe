import React from 'react'
import './Footer.css'
import mapImage from '../Asset/map.png'
import mailImage from '../Asset/gmail.png'
import csImage from '../Asset/customer-service.png'

const Footer = () => {
    return (
        <footer className='footer'>
            <div className='footer-wrap'>
                <div className='footer-item'>
                    <div className='footer-icon'>
                        <img src={mapImage} alt="" style={{ width: '50px', height: 'auto' }} />

                    </div>
                    <div>
                        <h5>Jl. Proklamasi No. 11 Kota Tegal</h5>
                    </div>
                </div>
                <div className='footer-item'>
                    <div className='footer-icon'>
                        <img src={mailImage} alt="" style={{ width: '50px', height: 'auto' }} />
                    </div>
                    <div>
                        <h5>dpukotategal@gmail.com</h5>
                    </div>
                </div>
                <div className='footer-item'>
                    <div className='footer-icon'>
                        <img src={csImage} alt="" style={{ width: '50px', height: 'auto' }} />
                    </div>
                    <div>
                        <h5>(0283) 356353</h5>
                    </div>
                </div>
                <div className='footer-social'>
                    <div className='footer-social-item'>
                        <div className='facebook-icon'></div>
                        <div className='social-item'></div>
                        <div className='social-item'></div>
                    </div> 
                    <div className='footer-social-title'>Dinas Pekerjaan Umum dan Penataan Ruang Kota Tegal</div>
                </div>
            </div>

        </footer>
    )
}

export default Footer