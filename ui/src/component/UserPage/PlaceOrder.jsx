import React, { useEffect, useState } from "react";
import { Header } from "../header_footer/header";
import { Link, useParams } from "react-router-dom";
import product from "../../images/product.jpeg";
import Done from "../../images/Done.png";
import { Button } from "react-bootstrap";
import axios from "axios";
import { Backend_url } from "../../constant";

const OrderSummary = () => {
  const { id, quantity } = useParams(); // Receive id and quantity from route params
  const [productData, setProductData] = useState({});
  const [profileData, setProfileData] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get(`${Backend_url}/api/admin/getProduct/${id}`)
      .then(res => setProductData(res.data))
      .catch(err => console.error("Failed to fetch product:", err));
  }, [id]);

  useEffect(() => {
    const email = JSON.parse(localStorage.getItem("user"))?.email;
    if (email) {
      axios.get(`${Backend_url}/api/auth/getuser/${email}`)
        .then(res => setProfileData(res.data))
        .catch(err => console.error("Failed to fetch profile:", err));
    }
  }, []);

  const getDeliveryDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 2);
    return today.toLocaleDateString("en-GB");
  };

  const handlePlaceOrder = () => {
    if (!profileData.address || !profileData.contactNo) {
      setError("Please provide a valid address and contact number.");
      return;
    }

    const orderData = {
      orderId: id,
      orderDate: getDeliveryDate(),
      orderPerson: JSON.parse(localStorage.getItem("user")).email,
      orderAddress: profileData.address,
      orderContact: profileData.contactNo,
    };

    axios.post(`${Backend_url}/api/admin/order`, orderData)
      .then(() => setShowSuccess(true))
      .catch(err => {
        console.error("Order failed:", err);
        setError("Order submission failed. Please try again.");
      });
  };

  const qty = parseInt(quantity) || JSON.parse(localStorage.getItem("qty")) || 1;
  const price = productData?.price || 0;

  return (
    <div>
      <Header />
      {showSuccess ? (
        <div className="d-flex flex-column align-items-center justify-content-center text-center" style={{ padding: "10px", minHeight: "100%" }}>
          <img src={Done} alt="Done" className="img-fluid mb-4 mt-5" style={{ width: "50%" }} />
          <h4>
            Thank you for ordering.
            <br />Your order will be delivered
            <br />shortly.
          </h4>
          <Link to="/OrderHistory">
            <Button className="btn w-100">OK</Button>
          </Link>
        </div>
      ) : (
        <div className="container mt-4">
          <h2>Order Summary</h2>

          <div className="order-info mb-4 border border-dark p-3 rounded">
            <p><strong>Shipping to:</strong> {profileData?.address}</p>
            <hr />
            <p><strong>Items:</strong> {qty}</p>
            <p><strong>Order Total:</strong> ₹{(price * qty).toFixed(2)}</p>
          </div>

          <div className="order-info mb-4 border border-dark p-3 rounded">
            <h3>Deliver to:</h3>
            <hr />
            <p>{profileData?.name}</p>
            <p>{profileData?.address}</p>
            <p><strong>Phone Number:</strong> {profileData?.contactNo}</p>
            <Link to="/UserProfile">
              <h6 className="text-primary text-center" style={{ cursor: "pointer" }}>
                Change Delivery Address
              </h6>
            </Link>
          </div>

          <h5>Get It by</h5>
          <div className="border border-dark rounded p-3 mb-4">
            <h4 className="text-success">Arriving {getDeliveryDate()}</h4>
            <hr />
            <div className="d-flex flex-column align-items-center">
              <div className="d-flex gap-3 align-items-center border rounded shadow-sm p-3 mb-4" style={{ maxWidth: "600px" }}>
                <img
                  src={productData.imgName ? `${Backend_url}/api/admin/image/${productData.imgName}` : product}
                  alt={productData.productName}
                  className="img-fluid rounded"
                  style={{ width: "100px" }}
                />
                <div>
                  <h5 className="mb-2" style={{ fontSize: "16px" }}>{productData.productName}</h5>
                  <p className="fs-4 fw-bold text-dark">₹{(price * qty).toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>

          {error && <p className="text-danger text-center">{error}</p>}

          <button type="button" onClick={handlePlaceOrder} className="btn btn-primary w-100 mb-5 mt-3 rounded">
            Place Your Order
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
