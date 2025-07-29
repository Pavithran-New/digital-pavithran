import React, { useEffect, useState } from "react";
import { Header } from "../header_footer/header";
import {
  FaAngleRight,
} from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Backend_url } from "../../constant";
import axios from "axios";

import creditcard from "../../images/icons/creditcard.png";
import paypal from "../../images/icons/paypal.png";
import rupees from "../../images/icons/rupees.png";
import netbanking from "../../images/icons/netbanking.png";
import cashondelivery from "../../images/icons/CashOnDelivery.png";

const Payment = () => {
  const [payment, setPayment] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(() => JSON.parse(localStorage.getItem("qty")) || 1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${Backend_url}/api/admin/getProduct/${id}`);
        setPayment(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleQuantityChange = (e) => {
    const val = parseInt(e.target.value);
    if (val >= 1) {
      setQuantity(val);
      localStorage.setItem("qty", val);
    }
  };

  const handleSubmit = (to) => {
    navigate(to);
  };

  const item = payment;

  if (!item || !item.product_name) {
    return <div className="text-center my-5">Loading payment info...</div>;
  }

  const paymentMethods = [
    { label: "Debit / Credit Card", method: "credit-card", icon: creditcard },
    { label: "Net Banking", method: "credit-card", icon: netbanking },
    { label: "Paypal", method: "upi", icon: paypal },
    { label: "UPI", method: "upi", icon: rupees },
  ];

  return (
    <div>
      <Header />
      <h3 style={{ marginTop: "10%", marginLeft: "5%" }}>Select a payment method</h3>

      <div
        style={{
          flex: 1,
          display: "flex",
          padding: "20px",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          key={item._id}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            padding: "10px",
            marginBottom: "20px",
            width: "100%",
            maxWidth: "600px",
            textAlign: "center",
          }}
        >
          <div style={{ display: "flex", gap: "5px", flexWrap: "wrap", justifyContent: "center" }}>
            <img
              src={`${Backend_url}/api/admin/image/${item.imgName}`}
              alt={item.product_name}
              style={{ width: "50%", borderRadius: "10px", objectFit: "cover" }}
            />
            <div>
              <h2 style={{ margin: "10px 0", fontSize: "16px" }}>
                {item.product_name}
              </h2>
              <div style={{ marginBottom: "10px" }}>
                <label htmlFor="quantity" style={{ marginRight: "10px", fontSize: "12px" }}>
                  Quantity:
                </label>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                  style={{
                    width: "60px",
                    padding: "2px",
                    fontSize: "16px",
                    textAlign: "center",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>
              <p style={{ fontSize: "20px", fontWeight: "bold", color: "#333" }}>
                ₹{item.price * quantity}
              </p>
            </div>
          </div>
        </div>

        <div style={{ width: "100%", maxWidth: "600px", color: "#1674AE" }}>
          <ul style={{ listStyleType: "none", padding: "10px", margin: "0" }}>
            {paymentMethods.map((pm, index) => (
              <React.Fragment key={index}>
                <li
                  style={{
                    margin: "10px 0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    handleSubmit(`/paymentDetails/${id}/${quantity}?method=${pm.method}`)
                  }
                >
                  <img
                    src={pm.icon}
                    alt={pm.label}
                    style={{ width: "25px", height: "25px", marginRight: "10px" }}
                  />
                  {pm.label}
                  <FaAngleRight size={24} />
                </li>
                <hr style={{ margin: "10px 0" }} />
              </React.Fragment>
            ))}

            <li
              style={{
                margin: "10px 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
              }}
              onClick={() => handleSubmit(`/PlaceOrder/${id}/${quantity}`)}
            >
              <img
                src={cashondelivery}
                alt="Cash On Delivery"
                style={{ width: "25px", height: "25px", marginRight: "10px" }}
              />
              Cash On Delivery
              <FaAngleRight size={24} />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Payment;
