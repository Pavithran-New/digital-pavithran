import React from 'react';
import { Header } from '../../component/header_footer/header';
import { Footer } from '../../component/header_footer/footer';
import Done from '../../images/Done.png';
import { Link } from 'react-router-dom';

const ConfirmShipment = () => {
    const details = [
        { label: 'Order ID', value: '3354654654526' },
        { label: 'Tracking/Consignment Number', value: '6754ADRE77LE956' }
    ];

    return (
        <div style={{ padding: '5px' }}>
            <Header label={'Order'} />
            <div style={{ 
                padding: '10px', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
               
            }}>
                <img 
                    src={Done} 
                    alt="Done" 
                    style={{ 
                        width: '50%', 
                        marginBottom: '30px',
                        marginTop: '20%' 
                    }} 
                />
                <h4 style={{ textAlign: 'center' }}>Shipment Confirmed</h4>
                {details.map((detail, index) => (
                    <div 
                        key={index} 
                        style={{ 
                            textAlign: 'center', 
                            marginBottom: '10px' 
                        }}
                    >
                        <h6>{detail.label}: {detail.value}</h6>
                    </div>
                ))}
                <Link to={'/UpAndPreviousOrder'}>
                <button 
                    style={{ 
                        backgroundColor: '#501924', 
                        color: 'white', 
                        borderRadius: '5px', 
                        width: '100%', 
                        marginTop: '40%', 
                        border: 'none', 
                        padding: '10px' 
                    }}
                >
                    DONE
                </button></Link>
                <div style={{ 
                    position: 'absolute', 
                    bottom: 0, 
                    width: '100%' 
                }}>
                
                </div>
            </div>
        </div>
    );
}

export default ConfirmShipment;
