import React from 'react';
import { Header } from '../../component/header_footer/header';
import { Footer } from '../../component/header_footer/footer';
import { FiLogOut } from "react-icons/fi";
import { Link } from 'react-router-dom';

const UserDashboard = () => {
    const buttonStyle = {
        marginBottom: '10px',
        padding: '10px 20px',
        borderRadius: '8px',
        backgroundColor: '#925E69',
        color: 'white',
        fontSize: '20px',
        display: 'inline-block', 
        width: '100%', 
        textAlign: 'center',
    };

    return (
        <div className='text-center' style={{ maxWidth: '100%', margin: '0 auto', borderRadius: '8px' }}>
          <div>
            <Header label={''} />
          </div>
          <div style={{ marginTop: '30%', textAlign: 'center', width: '80%', marginLeft: '10%' }}>
              {[
                  { label: 'Order History', path: '/OrderHistory' },
                  { label: 'Cancel/Return', path: '' },
                  { label: 'Privacy Policy', path: '' },
                  { label: 'FAQ', path: '' },
                  { label: 'Terms And Condition', path: '' }
              ].map(({ label, path }) => (
                  <div key={label} className="mb-3">
                      <Link to={path} style={{ textDecoration: 'none' }}>
                          <div style={buttonStyle}>{label}</div>
                      </Link>
                  </div>
              ))}
          </div>
          <Link to='/login'>
              <button className="btn btn-dark w-50 text-white" style={{ backgroundColor: '#501924', borderRadius: '5px', marginTop: '20%', width: '40%' }}>
                  LOG OUT <FiLogOut />
              </button>
          </Link>
          <div style={{position: 'absolute', bottom: 0, width: '100%'}}>
              <Footer />
          </div>
        </div>
    );
}

export default UserDashboard;
