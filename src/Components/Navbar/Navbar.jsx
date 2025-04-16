import React from "react";
import './Navbar.css';
import logo from '../Assets/iitu.png';

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="nav-logo">
                <img src={logo} alt="Logo" className="logo-img" />
                <p className="nav-title">Teacher Management Information System</p>
            </div>
        </div>
    );
};

export default Navbar;
