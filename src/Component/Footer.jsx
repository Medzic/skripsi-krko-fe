import React from 'react'
import './Footer.css'

const Footer = () => {
    return (
        <footer className='footer'>
            <div className='footer-wrap'>
                <div className='footer-item'>
                    <div className='footer-icon'>
                        <img src="http://dpupr.tegalkota.go.id/wp-content/uploads/d4858fd1d4664a86bcf06733e56608d7.png" alt="" />

                    </div>
                    <div>
                        <h5>Jl. Proklamasi No. 11 Kota Tegal</h5>
                    </div>
                </div>
                <div className='footer-item'>
                    <div className='footer-icon'>
                        <img src="http://dpupr.tegalkota.go.id/wp-content/uploads/email-gmail-png.png" alt="" />
                    </div>
                    <div>
                        <h5>dpukotategal@gmail.com</h5>
                    </div>
                </div>
                <div className='footer-item'>
                    <div className='footer-icon'>
                        <img src="http://dpupr.tegalkota.go.id/wp-content/uploads/support.png" alt="" />
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