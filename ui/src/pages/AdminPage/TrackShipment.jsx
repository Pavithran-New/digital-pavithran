import React, { useState } from 'react';
import { Header } from '../../component/header_footer/header';
import { Footer } from '../../component/header_footer/footer';
import { Link, useNavigate } from 'react-router-dom';

const TrackShipment = () => {
    const navigate = useNavigate()
    const [selectedValue, setSelectedValue] = useState('');

    // Function to handle selection change
    const handleChange = (event) => {
      setSelectedValue(event.target.value);
    }

    const handleSubmit = async () => {
        if (selectedValue!=="") {
            navigate('/TrackShipmentDetails')
        }else{
            console.log('first')
        }
    }

    return (

        <form onSubmit={handleSubmit} style={{ padding: '10px' }}>
            <Header label={'Track Order'} />
            <div className=" p-4 rounded" style={{ border: '1px solid black', marginTop: '20%' }}>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Order Id"
                        required
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Consignment Number"
                        required
                    />
                </div>

                <div className="mb-3">
                    <select className="form-select form-select-m" value={selectedValue} onChange={handleChange}>
                        <option value="">Select Courier Partner</option>
                        <option value="DTDC">DTDC</option>
                        <option value="Post">India Post</option>
                        <option value="Fedex">Fedex</option>
                        <option value="Express">Safe Express</option>
                    </select>
                </div>
            </div>
            <button className="btn btn-dark w-75 text-white" style={{ backgroundColor: '#501924', borderRadius: '5px', marginTop: '60%', marginLeft: '10%', width: '90%' }}>
                Track Shipment
            </button>
            <div style={{ position: 'absolute', bottom: -20, width: '100%' }}>
                <Footer />
            </div>
        </form>
    );
}

export default TrackShipment;
