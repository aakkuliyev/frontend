import React from "react";
import './AboutUs.css'

const AboutUs = () => {
    
    const shopAddresses = [
        { name: 'Shop 1', address: '123 Mangilik El Avenue, Astana, Kazakhstan' },
        { name: 'Shop 2', address: '456 Al-Farabi, Almaty, Kazakhstan' },
        { name: 'Shop 3', address: '789 5Avenue, New Yourk, USA' },
    ];

    return (
        <div>
            <center>
            <h2>Our Shop Addresses</h2>
            </center>
            <table className="address-table">
                <thead>
                    <tr>
                        <th>Shop Name</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {shopAddresses.map((shop, index) => (
                        <tr key={index}>
                            <td>{shop.name}</td>
                            <td>{shop.address}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AboutUs;
