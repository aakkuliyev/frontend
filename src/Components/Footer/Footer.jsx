import React from "react";
import './Footer.css';
import footer_logo from '../Assets/iitu.png';

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-logo">
                <img src={footer_logo} alt="IITU Logo" />
                <p>IITU University</p>
            </div>

            <div className="footer-info">
                <p>Teacher Management Information System</p>
                <p>Developed by Aibek Shynazbek</p>
                <p>Almaty, 2025</p>
            </div>

            <div className="footer-bottom">
                <hr />
                <p>© 2025 IITU University. All rights reserved.</p>
            </div>
        </div>
    );
};

export default Footer;
