import React from 'react';
import truck1 from '../../images/truck1.png';
import truck2 from '../../images/truck2.png';
import truck3 from '../../images/truck3.png';
import { Header } from '../../component/header_footer/header';
import { Link, useParams } from 'react-router-dom';
import { Backend_url } from '../../constant';
import axios from 'axios';



const OrderDetails = () => {
  const{id} = useParams()
  const orderBooking = () =>{
    const data ={orderStatus:'Confirm'}
    axios.put(`${Backend_url}/api/admin/update/order/${id}`,data).then(res=>console.log(res.data))
  }
  return (
    
    <div style={{ padding: '10px'}}>
      <Header label={ 'Order' } />
      <div style={{ display: 'flex', marginBottom: '20px', borderRadius: '10px', border: '1px solid black', marginTop: '20px'  }}>
        <div style={{ border: '1px solid black', padding: '10px', width: '200px', textAlign: 'center',borderTopLeftRadius:'10px',borderBottomLeftRadius:'10px' }}>
            <img src={truck1} alt="truck" style={{width: '90%'}} />
          Full Truck<br />More than 2.5 tones
        </div>
        <div style={{ border: '1px solid black', padding: '10px', width: '200px', textAlign: 'center' }}>
        <img src={truck2} alt="truck" style={{width: '90%'}} />
          Part Truck<br />30KG to 2500 KG
        </div>
        <div style={{ border: '1px solid black', padding: '10px', width: '200px', textAlign: 'center',borderTopRightRadius:'10px',borderBottomRightRadius:'10px' }}>
        <img src={truck3} alt="truck" style={{width: '90%'}} />
          Courier<br />Less Than 30KG
        </div>
      </div>

      <div className=" p-4 rounded mb-4" style={{border: '1px solid black'}}>
        <div className="mb-3">
          <select className="form-select form-select-m">
            <option>Select Courier Partner</option>
            <option>DTDC</option>
            <option>India Post</option>
            <option>Fedex</option>
            <option>Safe Express</option>
          </select>
        </div>
        <div className="mb-3">
          <select className="form-select form-select-m">
            <option>Select Delivery Type</option>
            <option>Normal</option>
            <option>Speed</option>
            <option>Premium</option>
          </select>
        </div>
        <div className="mb-3">
          <select className="form-select form-select-m">
            <option>Select Delivery Time Period</option>
            <option>By Today</option>
            <option>Tomorrow</option>
            <option>After 3 Days</option>
            <option>After 5 Days</option>
          </select>
        </div>
      </div>
      <Link to={'/ConfirmShipment'}>
      <button className="btn btn-dark w-75 text-white" style={{ backgroundColor: '#501924', borderRadius: '5px', marginTop: '40%', marginLeft: '10%' }} onClick={()=>orderBooking()}>
  BOOK
</button>
</Link>
    </div>
  );
}

export default OrderDetails;
