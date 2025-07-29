import React, { useEffect, useState } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import image1 from '../../images/product.jpeg'
import { Footer } from '../../component/header_footer/footer';
import { Header } from "../../component/header_footer/header";
import styled from 'styled-components';
import { Backend_url } from '../../constant';
import axios from 'axios';
import { Link } from 'react-router-dom';



const ProductArray = [
    { image: image1, name: "Hand-painted ceramic vase", type: 'Flower vase', price: '1,149.00', quantity: "3", contactNo: '324354345', SKU: "UTT65219250", paymentStatus: "pain", address: "Address: Saveetha School Of Enginnering, Chennai, Tamilnadu", deliveredOn: "12/08/2024", deleveredStatus: 'Delivered', orderId: "3354654654526", orderPerson: "Meghana Lakshmi" },
    { image: image1, name: "Hand-painted ceramic vase", type: 'Flower vase', price: '1,149.00', quantity: "5", contactNo: '324354345', SKU: "UTT65219250", paymentStatus: "pain", address: "Address: Saveetha School Of Enginnering, Chennai, Tamilnadu", deliveredOn: "12/08/2024", deleveredStatus: 'Delivered', orderId: "3354654654526", orderPerson: "Meghana Lakshmi" },
    { image: image1, name: "Hand-painted ceramic vase", type: 'Flower vase', price: '1,149.00', quantity: "2", contactNo: '324354345', SKU: "UTT65219250", paymentStatus: "pain", address: "Address: Saveetha School Of Enginnering, Chennai, Tamilnadu", deliveredOn: "12/08/2024", deleveredStatus: 'Delivered', orderId: "3354654654526", orderPerson: "Meghana Lakshmi" }
]
// compare date from backend and today date
function compareDate(inputDate) {
    // Split the dd/mm/yyyy string and convert it into a Date object
    let parts = inputDate.split('/');
    let day = parseInt(parts[0], 10);
    let month = parseInt(parts[1], 10) - 1; // Months are zero-based in JavaScript
    let year = parseInt(parts[2], 10);

    let dateToCompare = new Date(year, month, day);

    // Get today's date (without time for accurate comparison)
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    // Compare the input date with today's date and return appropriate string
    if (dateToCompare < today) {
        return 'completed';
    } else if (dateToCompare > today) {
        return 'upcoming';
    } else {
        return 'today';
    }
}

function UpAndPreviousOrder() {
    const [getProduct, setGetProduct] = useState()

    useEffect(() => {
        // handleSubmit()
        compareDate("01/09/2024");

    }, [])
    const [cart, setCart] = useState([]);
    const fetchData = async () => {
        try {
            const response = await axios.get(`${Backend_url}/api/admin/getProduct`);
            setCart(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const [orderData, setOrderData] = useState([]);
    const getOrder = () => {
        const getData = axios.get(`${Backend_url}/api/admin/get/order`).then((res) => (setOrderData(res.data?.updatedProduct)))
    }
    useEffect(() => {
        getOrder();
        fetchData();
    }, [])

    const upCommingData = orderData.filter(item => item.orderStatus === 'Request')
    const orderIds = upCommingData.map(order => order.orderId);



    const orderCount = orderIds.reduce((acc, orderId) => {
        acc[orderId] = (acc[orderId] || 0) + 1;
        return acc;
    }, {});

    const processedProducts = cart.flatMap(product => {
        const count = orderCount[product._id] || 0;
        return Array.from({ length: count }, () => product);
    });

    const previousData = orderData.filter(item => item.orderStatus === ('Confirm' || 'Rejected' || 'Canceled'))
    const orderIds2 = previousData.map(order => order.orderId);


    const orderCount2 = orderIds2.reduce((acc, orderId) => {
        acc[orderId] = (acc[orderId] || 0) + 1;
        return acc;
    }, {});

    const processedProducts2 = cart.flatMap(product => {
        const count = orderCount2[product._id] || 0;
        return Array.from({ length: count }, () => product);
    });
    const outofStack = (id) => {
        const data = { orderStatus: 'Rejected' }
        axios.put(`${Backend_url}/api/admin/update/order/${id}`, data).then(res => console.log(res.data))
        window.location.reload();
    }
    return (
        <>
            <Header label={'Order'} />
            <section style={{ padding: '1rem', marginBottom: '3rem' }}>
                <StyledTabs>
                    <Tabs
                        defaultActiveKey="profile"
                        id="justify-tab-example"
                        className="mb-3"
                        justify
                    >
                        <Tab eventKey="home" title="Upcoming Orders">
                            {processedProducts.map((item, key1) =>
                            (<div className="card mb-3">
                                <div className="row g-0">
                                    <div className="col-4 d-flex justify-content-center align-items-center">
                                        <img src={`${Backend_url}/api/admin/image/${item.imgName}`} className="img-fluid rounded-start" style={{ width: '100%', height: '50%' }} alt="..." />
                                    </div>
                                    <div className="col-8">
                                        <div className="card-body" style={{ fontSize: '14px' }}>
                                            <h5 className="">{item.product_name}</h5>
                                            <b className="m-0">{item.product_type}</b>
                                            <p className="m-0">SKU# : {item._id}</p>
                                            <h3 className="m-0">₹{item.price}</h3>
                                            <p className="m-0">{upCommingData[key1].orderPerson}</p>
                                            <p className="m-0">Phone Number : {upCommingData[key1].orderContact}</p>
                                            <p className="m-0">Quantity : {item.quantity ? item.quantity : 1}</p>
                                            {/* <p className="m-0">Payment Status : {item.paymentStatus}</p> */}
                                            <p className="m-0">Address : {upCommingData[key1].orderAddress}</p>
                                        </div>
                                    </div>
                                    <div style={{ width: '100%', display: 'grid', alignItems: 'center' }}>
                                        <Link to={`/ShipmentDetails/${upCommingData[key1].orderAddress}/${upCommingData[key1]._id}`}>
                                            <button className="btn btn-dark text-white" style={{ backgroundColor: '#501924', borderRadius: '5px', width: '90%', margin: 'auto' }}>
                                                Confirm & Ship
                                            </button></Link>
                                    </div>
                                    <div style={{ width: '100%', display: 'grid', alignItems: 'center', marginTop: '10px' }}>
                                        <Link>
                                            <button className="btn btn-dark text-white" style={{ backgroundColor: '#501924', borderRadius: '5px', width: '90%', margin: 'auto' }} onClick={() => { const id = upCommingData[key1]._id; outofStack(id) }}>
                                                Out Of Stock
                                            </button></Link>
                                    </div>
                                </div>
                            </div>)

                            )
                            }
                        </Tab>
                        <Tab eventKey="profile" title="Previous Orders">
                            {
                                processedProducts2.map((item, key1) =>
                                (<div className="card mb-3">
                                    <div className="row g-0">
                                        <div className="col-4 d-flex justify-content-center align-items-center">
                                            <img src={`${Backend_url}/api/admin/image/${item.imgName}`} className="img-fluid rounded-start" style={{ width: '100%', height: '50%' }} alt="..." />
                                        </div>
                                        <div className="col-8">
                                            <div className="card-body" style={{ fontSize: '14px' }}>
                                                <h5 className="">{item.product_name}</h5>
                                                <b className="m-0">{item.product_type}</b>
                                                <p className="m-0">SKU# : {item._id}</p>
                                                <h3 className="m-0">₹{item.price}</h3>
                                                <p className="m-0">{previousData[key1].orderPerson}</p>
                                                <p className="m-0">Phone Number : {previousData[key1].orderContact}</p>
                                                <p className="m-0">Quantity : {item.quantity ? item.quantity : 1}</p>
                                                {/* <p className="m-0">Payment Status : {item.paymentStatus}</p> */}
                                                <p className="m-0">Address : {previousData[key1].orderAddress}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>)

                                )
                            }
                        </Tab>
                    </Tabs>
                </StyledTabs>
            </section>
            <footer style={{ position: 'fixed', bottom: 0, width: '100%' }}><Footer /></footer>
        </>
    )
}

const StyledTabs = styled.div`
  .nav-link.active {
    background-color: #501924 !important; 
    color: #ffffff !important;
  }

  .nav-link {
    color: black !important; // Ensure normal tabs are black
  }

  .nav-item.show .nav-link, 
  .nav-link.active {
    color: #ffffff !important; // Ensure active tabs are white
  }
`;


export default UpAndPreviousOrder