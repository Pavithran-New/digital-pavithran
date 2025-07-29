import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import image1 from "../../images/product.jpeg";
import { Header } from "../../component/header_footer/header";
import styled from "styled-components";
import { Backend_url } from "../../constant";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductArray = [
  {
    image: image1,
    name: "Hand-painted ceramic vase",
    price: "1,149.00",
    quantity: "3",
    arrivedOn: "12/08/2024",
    orderId: "3354654654526",
  },
  {
    image: image1,
    name: "Hand-painted ceramic vase",
    price: "1,149.00",
    quantity: "5",
    arrivedOn: "12/08/2024",
    orderId: "3354654654526",
  },
  {
    image: image1,
    name: "Hand-painted ceramic vase",
    price: "1,149.00",
    quantity: "2",
    arrivedOn: "12/08/2024",
    orderId: "3354654654526",
  },
];

function compareDate(inputDate) {
  let parts = inputDate.split('/');
  let day = parseInt(parts[0], 10);
  let month = parseInt(parts[1], 10) - 1;
  let year = parseInt(parts[2], 10);

  let dateToCompare = new Date(year, month, day);

  let today = new Date();
  today.setHours(0, 0, 0, 0);

  if (dateToCompare < today) {
    return 'completed';
  } else if (dateToCompare > today) {
    return 'upcoming';
  } else {
    return 'today';
  }
}
function compareInput(inputDate) {
  let parts = inputDate;

  if (parts === 'Request') {
    return 'Pending';
  }
  else {
    return 'completed';
  }
}

function OrderHistory() {
  const [getProduct, setGetProduct] = useState();
  const [quanity, setQuanity] = useState("");

  const [gettedData, setGettedData] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [upcomingOrders, setUpcomingOrders] = useState([]);
  const [todayOrders, setTodayOrders] = useState([]);
  const [orderList, setorderList] = useState([]);
  const [productList, setproductList] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    handlegetAllProduct()
    handlegetAllOrder()
  }, []);

  const handlegetAllProduct = async () => {
    try {
      const response = await axios.get(`${Backend_url}/api/admin/getProduct`);
      setproductList(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const handlegetAllOrder = async () => {
    try {
      const response = await axios.get(`${Backend_url}/api/admin/get/order`);
      setorderList(response.data.updatedProduct);
    } catch (err) {
      console.log(err);
    }
  };
  const userinfo = JSON.parse(localStorage.getItem("user"))
  const order1 = orderList.filter(o => o.orderPerson === userinfo.email);
  const orderIds = order1.map(order => order.orderId);
  const orderCount = orderIds.reduce((acc, orderId) => {
    acc[orderId] = (acc[orderId] || 0) + 1;
    return acc;
  }, {}); 

  useEffect(() => {
    // Filter products based on orderId from orderList
    // const filteredProducts = productList.filter(product => {
    //   return orderList.some(order => order.orderId === product._id);
    // });
    const processedProducts = productList.flatMap(product => {
      const count = orderCount[product._id] || 0;
      return Array.from({ length: count }, () => product);
    });
    setGettedData(processedProducts); // Store filtered products 
    // Now filter based on orderDate
    const filteredByDate = processedProducts.reduce(
      (acc, product) => {

        const order = order1.find(o => o.orderId === product._id); 
        if (order) {
          const status = compareDate(order.orderDate); // Compare the dates
          const status2 = order.orderStatus // Compare the dates

          if (status === 'completed') {
            acc.completed.push({ ...product, order, status2 });
          } else if (status === 'upcoming') {
            acc.upcoming.push({ ...product, order, status2 });
          } else if (status === 'today') {
            acc.today.push({ ...product, order, status2 });
          }
        }
        return acc;
      },
      { completed: [], upcoming: [], today: [] }
    );


    setCompletedOrders(filteredByDate.completed);
    setUpcomingOrders(filteredByDate.upcoming);
    setTodayOrders(filteredByDate.today);

  }, [orderList, productList]);
  console.log(todayOrders,upcomingOrders,completedOrders)
  // console.log(getProduct)
  const TrackOrder = () => { };
 
  const data = upcomingOrders.map(item => item.orderPerson); 
  return (
    <>
      <Header label={"Order History"} />
      <section style={{ padding: "1rem", marginBottom: "3rem" }}>
        <StyledTabs>
          <Tabs
            defaultActiveKey="profile"
            id="justify-tab-example"
            className="mb-3"
            justify
          >
            <Tab eventKey="home" title="Upcoming">
              {upcomingOrders.map((item) => (
                item && item?.order?.orderPerson === userinfo.email ? <div className="card mb-3">
                  <div classname="card-header ">
                    {item && item.order?.orderStatus === 'Confirm' ? <b style={{ color: '#206010', paddingLeft: '1rem' }}> Arriving {item.order.orderDate}</b> : false}
                    {item && item.order?.orderStatus === 'Request' ? <b style={{ color: '#206010', paddingLeft: '1rem' }}> Waiting For Seller Accept</b> : false}
                    {item && item.order?.orderStatus === 'Rejected' ? <b style={{ color: '#206010', paddingLeft: '1rem' }}> Item is an Out Of Stock,Seller has been cancelled your order</b> : false}
                    {item && item.order?.orderStatus === 'Canceled' ? <b style={{ color: '#206010', paddingLeft: '1rem' }}> You Cancel This order</b> : false}
                  </div>
                  <div className="row g-0">
                    <div className="col-3 d-flex justify-content-center align-items-center">
                      <img
                        src={`${Backend_url}/api/admin/image/${item.imgName}`}
                        className="img-fluid rounded-start"
                        style={{ width: "100%", height: "50%" }}
                        alt="..."
                      />
                    </div>
                    <div className="col-9">
                      <div className="card-body" style={{ fontSize: "14px" }}>
                        <h5 className="">{item.name}</h5>
                        {/* <p className="m-0">Qty</p> */}
                        {/* <select
                          className="form-select"
                          aria-label="Default select example"
                          value={quanity}
                          onChange={(e) => setQuanity(e.target.value)}
                        >
                          <option value="0">0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                        </select> */}
                        <h3 className="m-0 text-warning">₹{item.price}</h3>
                        {item && item.order?.orderStatus === ('Rejected' || "Canceled") ? false : <div className="d-flex justify-content-between">
                          <div className="8">
                            <Link to={`/TrackOrder/${item?.order?._id}`}>
                              <TrackBtn type="button" onClick={TrackOrder}>
                                Track Order
                              </TrackBtn></Link>
                          </div>
                          <div className="8">
                            <Link to={`/CancelOrder/${item.order?._id}`}>
                              <CancelBtn type="button" >
                                Cancel Order
                              </CancelBtn></Link>
                          </div>
                        </div>}
                      </div>
                    </div>
                  </div>
                </div> : null
              ))}
            </Tab>
            <Tab eventKey="profile" title="Completed">
              {completedOrders.filter((item) => userinfo.email === item.orderPerson).map((item) => (
                <div className="card mb-3">
                  <div className="row g-0">
                    <div className="col-4 d-flex justify-content-center align-items-center">
                      <img
                        src={`${Backend_url}/api/admin/image/${item.imgName}`}
                        className="img-fluid rounded-start"
                        style={{ width: "100%", height: "50%" }}
                        alt="..."
                      />
                    </div>
                    <div className="col-8">
                      <div className="card-body" style={{ fontSize: "14px" }}>
                        <h5 className="">{item.name}</h5>
                        <h3 className="m-0">₹{item.price}</h3>
                        <p className="m-0">Qty</p>
                        <select
                          className="form-select w-50"
                          aria-label="Default select example"
                          value={quanity}
                          onChange={(e) => setQuanity(e.target.value)}
                        >
                          <option selected>0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                        </select>
                        {item && item.order?.orderStatus === 'Confirmed' ? <h3 className="m-0 text-danger">Order Received</h3> : null}
                        {item && item.order?.orderStatus === 'Rejected' ? <h3 className="m-0 text-danger">Rejected due to outof Stock</h3> : null}
                        <Link to={`/ProductDetails/${item._id}`} className="m-0">details</Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Tab>
          </Tabs>
        </StyledTabs>
      </section>
    </>
  );
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

const TrackBtn = styled.button`
  background-color: #1674ae;
  color: white;
  border: 0;
  border-radius: 5px;
  padding: 8px;
`;
const CancelBtn = styled.button`
  background-color: #ae1616;
  color: white;
  border: 0;
  border-radius: 5px;
  padding: 8px;
`;

export default OrderHistory;
