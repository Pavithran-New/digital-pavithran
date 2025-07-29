import React, { useEffect, useState } from 'react';
import { Header } from '../header_footer/header';
import { Footer } from '../header_footer/footer';
import productImage from '../../images/product.jpeg';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Backend_url } from '../../constant';
import ChatBox from '../chatbot';

const YourCart = () => {
  const { id } = useParams();
  const [cart, setCart] = useState([]);
  const [cart1, setCart1] = useState([]);
  const [profileData, setProfileData] = useState([]);
  const {email} = JSON.parse(localStorage.getItem("user"))

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const handleQuantityChange = (id, newQuantity) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };
  useEffect(()=>{
    getData()
   
},[email]) 
const getData=()=>{ 
    const data = axios.get(`${Backend_url}/api/auth/getuser/${email}`).then((res)=>setProfileData(res.data))
}
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${Backend_url}/api/admin/getProduct`);
        setCart(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);
console.log(currentUser)
  const datas= profileData.addproducts
  setTimeout(()=>{
    const filteredCart = cart.filter(item => datas?.includes(item?._id));
    setCart1(filteredCart)
  },[2000])
  const filteredCart = cart1 
 
  const navigate = useNavigate()
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Header label={'YOUR CART'} />
      <div style={{ flex: 1, display: 'flex', padding: '20px', flexDirection: 'column', alignItems: 'center' }}>
        {filteredCart.map(item => (
        <div key={item.id} style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          padding: '10px',
          marginBottom: '20px',
          width: '100%',
          maxWidth: '600px',
          textAlign: 'center',
        }}>
          <div style={{ display: 'flex', gap: '5px' }}>
            <img src={`${Backend_url}/api/admin/image/${item.imgName}`} alt={item.productName} style={{ width: '50%', borderRadius: '10px' }} />
            <div>
              <h2 style={{ margin: '10px 0', fontSize: '16px' }}>{item.productName}</h2>
              <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#333' }}>₹{(item.price * 1).toFixed(2)}</p>
              <div style={{ marginBottom: '10px' }}>
                <label htmlFor={`quantity-${item.id}`} style={{ marginRight: '10px', fontSize: '12px' }}>Quantity:</label>
                <input
                  id={`quantity-${item.id}`}
                  type="number"
                  value={item.quantity || '1'}
                  min="1"
                  onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                  style={{
                    width: '60px',
                    padding: '2px',
                    fontSize: '16px',
                    textAlign: 'center',
                    borderRadius: '5px',
                    border: '1px solid #ccc'
                  }}
                />
              </div>
              <button style={{
                backgroundColor: '#FF6347',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px',
                marginTop: '10px'
              }}onClick={()=>navigate(`/payment/${item._id}`)}>
                BUY NOW
              </button>
            </div>
          </div>
        </div>
        ))}
      </div>
      
      <div style={{ position: 'absolute', bottom: 0, width: '100%' }}>
        <Footer />
      </div>
    </div>
  );
}

export default YourCart;
