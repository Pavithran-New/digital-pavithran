import React from 'react';
import { Header } from '../../component/header_footer/header';
import Done from '../../images/Done.png';
import { Link, useParams } from 'react-router-dom';


const RemoveProduct = () => {
    const {status} = useParams()
    // Determine the message based on the status
    const message = status ==='add' ? "Your Product is Added Successfully" : "Your Product is Removed Successfully";

    return (
        <div className="p-2">
            <Header />
            <div className="d-flex flex-column align-items-center justify-content-center text-center" style={{ padding: '10px', minHeight: '100%' }}>
                <img 
                    src={Done} 
                    alt="Done" 
                    className="img-fluid mb-4 mt-5" 
                    style={{ width: '50%' }} 
                />
                <h4>{message}</h4>
                <Link to={'/AllProducts'}>
                <button 
                    className="btn w-100" 
                    style={{ 
                        backgroundColor: '#501924', 
                        color: 'white',
                        borderRadius: '5px',
                        marginTop: '50%'
                    }}
                >
                    OK  
                </button></Link>
            </div>
        </div>
    );
}

export default RemoveProduct;
