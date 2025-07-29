import React from 'react';
import { Header } from '../../component/header_footer/header';
import { FiLogOut } from "react-icons/fi";
import { Link } from 'react-router-dom';

const AdminProfile = () => {
    const buttonStyle = {
        marginBottom: '10px',
        padding: '10px 20px',
        borderRadius: '8px',
        backgroundColor: '#925E69',
        color: 'white',
        fontSize: '20px',
        display: 'inline-block', 
        width: '100%', 
    };

    return (
        <div className='text-center' style={{ maxWidth: '100%', margin: '0 auto', padding: '20px', borderRadius: '8px' }}>
            <Header label={'ADMIN'} />
            <form style={{ marginTop: '30%', textAlign: 'center', width: '80%', marginLeft: '10%' }}>
                {['View Profile', 'Privacy Policy', 'FAQ', 'Terms And Condition'].map((label) => (
                    <div key={label} className="mb-3">
                        <input type="button" value={label} className="form-control" style={buttonStyle} />
                    </div>
                ))}
            </form>
            
            <Link to='/login'>
                <button className="btn btn-dark w-50 text-white" style={{ backgroundColor: '#501924', borderRadius: '5px', marginTop: '20%', width: '40%' }}>
                    LOG OUT <FiLogOut />
                </button>
            </Link>
        </div>
    );
}

export default AdminProfile;
