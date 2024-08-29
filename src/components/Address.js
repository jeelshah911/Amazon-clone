import React, { useState } from 'react';
import { useStateValue } from '../StateProvider';
import { useNavigate } from 'react-router-dom';
import './Address.css';
import Navbar from './Navbar';

function Address() {
    const [{}, dispatch] = useStateValue();
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [apt, setApt] = useState("");
    const [city, setCity] = useState("");
    const [province, setProvince] = useState("");
    const [postalcode, setPostalCode] = useState("");

    const navigate = useNavigate();

    const deliver = (e) => {
        e.preventDefault();

        dispatch({
          type: "SET_ADDRESS",
          item: {
            fullName,
            phone,
            address,
            apt,
            city,
            province,
            postalcode,
          },
        });

        navigate('/payment');
    };

    return (
        <div className="container">
            <Navbar />
            <div className="main">
                <form className="form-container" onSubmit={deliver}>
                    <div className="input-container">
                        <p>Full Name (First and Last Name)*</p>
                        <input
                            type='text'
                            placeholder='Enter your Full name'
                            onChange={(e) => setFullName(e.target.value)}
                            value={fullName}
                        />
                    </div>
                    <div className="input-container">
                        <p>Phone Number *</p>
                        <input
                            type='text'
                            placeholder='Enter your Phone Number'
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                        />
                    </div>
                    <div className="input-container">
                        <p>Address *</p>
                        <input
                            type='text'
                            placeholder='Street Address or P.O. BOX'
                            onChange={(e) => setAddress(e.target.value)}
                            value={address}
                        />
                    </div>
                    <div className="input-container">
                        <p>Apt, Suite, Unit, Building</p>
                        <input
                            type='text'
                            placeholder='Apt, Suite, Unit, Building'
                            onChange={(e) => setApt(e.target.value)}
                            value={apt}
                        />
                    </div>
                    <div className="input-container">
                        <p>City *</p>
                        <input
                            type='text'
                            placeholder='Enter the City you live in'
                            onChange={(e) => setCity(e.target.value)}
                            value={city}
                        />
                    </div>
                    <div className="input-container">
                        <p>Province *</p>
                        <input
                            type='text'
                            placeholder='Enter the Province'
                            onChange={(e) => setProvince(e.target.value)}
                            value={province}
                        />
                    </div>
                    <div className="input-container">
                        <p>Postal Code *</p>
                        <input
                            type='text'
                            placeholder='Enter the Postal Code'
                            onChange={(e) => setPostalCode(e.target.value)}
                            value={postalcode}
                        />
                    </div>
                    <button className="button" type='submit'>Use this Address</button>
                </form>
            </div>
        </div>
    );
}

export default Address;
