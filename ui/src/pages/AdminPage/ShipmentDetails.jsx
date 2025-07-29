import React from 'react';
import { Header } from '../../component/header_footer/header';
import { Footer } from '../../component/header_footer/footer';
import { Link, useParams } from 'react-router-dom';


const ShipmentDetails = () => {
    const labelStyle = {
        fontWeight: 'bold',
    };
    const inputStyle = {
        borderColor: '#333',
        color: '#333',
    };
const {address,id} = useParams();
    return (
        <div style={{ padding: '10px' }}>
            <style>
                {`
                    .form-control::placeholder {
                        color: #555; 
                        opacity: 1; 
                    }
                `}
            </style>

            <Header label="Orders" />
            <div className="p-4 rounded" style={{ border: '1px solid black', marginTop: '20%' }}>
                <h4>Enter Your Shipment Details</h4>

                <div className="form-group mb-3">
                    <label htmlFor="pickupAddress" style={labelStyle}></label>
                    <textarea
                        className="form-control"
                        id="pickupAddress"
                        placeholder="Pickup Address"
                        rows="3"
                        style={inputStyle} 
                    ></textarea>
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="dropAddress" style={labelStyle}></label>
                    <textarea
                        className="form-control"
                        id="dropAddress"
                        placeholder="Drop Address"
                        rows="3"
                        style={inputStyle}
                        value={address}
                    ></textarea>
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="weight" style={labelStyle}></label>
                    <textarea
                        className="form-control"
                        id="weight"
                        placeholder="Enter The Weight"
                        rows="1"
                        style={inputStyle}
                    ></textarea>
                    <h6>Material Weight *</h6>
                </div>
            </div>
            <Link to={`/OrderDetails/${id}`}>
            
            <button
                className="btn btn-dark text-white"
                style={{
                    backgroundColor: '#501924',
                    borderRadius: '5px',
                    marginTop: '30%',
                    marginLeft: '5%',
                    width: '90%',
                }}
            >
                NEXT
            </button></Link>
        </div>
    );
};

export default ShipmentDetails;
