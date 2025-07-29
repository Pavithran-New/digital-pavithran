import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Header } from "../header_footer/header";
import { Button } from "react-bootstrap";
import { LuFileText } from "react-icons/lu";
import { CiDeliveryTruck } from "react-icons/ci";
import { Backend_url } from "../../constant";
import axios from "axios";
import { useParams } from "react-router-dom";

const decreaseDays = (dateStr, n) => {
  if (!dateStr) {
    return ''; // Handle undefined or invalid date input
  }

  // Split the date string and convert to a Date object
  const [day, month, year] = dateStr.split('/').map(Number);
  const dateObj = new Date(year, month - 1, day);

  // Decrease the date by 'n' days
  dateObj.setDate(dateObj.getDate() - n);

  // Return the new date in 'DD/MM/YYYY' format
  const newDay = dateObj.getDate().toString().padStart(2, '0');
  const newMonth = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const newYear = dateObj.getFullYear();

  return `${newDay}/${newMonth}/${newYear}`;
};

const getFormattedTodayDate = () => {
  const today = new Date();

  const day = today.getDate().toString().padStart(2, '0');
  const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
  const year = today.getFullYear();

  return `${day}/${month}/${year}`;
};

function TrackOrder() {
  const [quanity, setQuanity] = useState("");
  const [getOrderDetails, setOrderDetails] = useState();
  const [getProductDetails, setGetProductDetails] = useState();
  const { id } = useParams()

  useEffect(() => {
    handleSubmit()
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await axios.get(`${Backend_url}/api/admin/get/order`);
      let allProduct = response.data.updatedProduct;
      allProduct = allProduct.filter((item) => item._id === id)
      if (allProduct.length === 0) {
        return setOrderDetails([]);
      }
      setOrderDetails(allProduct[0]);
      getFullProductDetails(allProduct[0]?.orderId)
    } catch (err) {
      console.log(err);
    }
  };

  const getFullProductDetails = async (id) => {
    try {
      const response = await axios.get(`${Backend_url}/api/admin/getProduct/${id}`);
      setGetProductDetails(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(getOrderDetails);



  return (
    <>
      <Header label={"Track Order"} />
      <section className="p-2">
        <div className="d-flex justify-content-between">
          <b>Order ID: 3354654654526</b>
          <Button variant="outline-secondary">
            <LuFileText /> Invoice
          </Button>
        </div>
        <br />
        <div
          className="d-flex justify-content-between"
          style={{ fontSize: "13px" }}
        >
          <span>Order date: {decreaseDays(getOrderDetails?.orderDate, 2)}</span>
          <span className="text-success">
            <CiDeliveryTruck /> Estimated delivery: {getOrderDetails?.orderDate}
          </span>
        </div>
        <br />
        <section>
          {/* above title */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              fontSize: "12px",
            }}
          >
            <p>Order Confirmed</p>
            <p>Shipped</p>
            <p>Out For Delivery</p>
            <p>Delivered</p>
          </div>
          {/* track  */}
          <div
            style={{
              position: "relative",
              display: "grid",
              justifyContent: "center",
              alignItems: "center",
              height: "30px",
            }}
          >
            <div style={{ position: "absolute", width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <div
                  style={
                    getOrderDetails?.orderDate &&
                      getFormattedTodayDate() === decreaseDays(getOrderDetails?.orderDate, 2)
                      ? blackcircle
                      : greencircle
                  }
                ></div>
                <div
                  style={
                    getOrderDetails?.orderDate &&
                      getFormattedTodayDate() === decreaseDays(getOrderDetails?.orderDate, 1)
                      ? blackcircle
                      : greencircle
                  }
                ></div>
                <div
                  style={
                    getOrderDetails?.orderDate &&
                      getFormattedTodayDate() === decreaseDays(getOrderDetails?.orderDate, 1)
                      ? blackcircle
                      : greencircle
                  }
                ></div>
                <div
                  style={
                    getOrderDetails?.orderDate &&
                      getFormattedTodayDate() === decreaseDays(getOrderDetails?.orderDate, 0)
                      ? blackcircle
                      : greencircle
                  }
                ></div>
              </div>
            </div>
            <div
              style={{
                position: "absolute",
                height: "10px",
                width: "100%",
                backgroundColor: "#D0D5DD",
                zIndex: -10,
              }}
            ></div>
          </div>
          {/* Date */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              fontSize: "12px",
            }}
          >
            <p>{decreaseDays(getOrderDetails?.orderDate, 2)}</p>
            <p>{decreaseDays(getOrderDetails?.orderDate, 1)}</p>
            <p>{decreaseDays(getOrderDetails?.orderDate, 1)}</p>
            <p>{getOrderDetails?.orderDate}</p>
          </div>
        </section>
        <br />
        <section>
          <div className="card mb-3">
            <div className="row g-0">
              <div className="col-3">
                <img src={`${Backend_url}/api/admin/image/${getProductDetails?.imgName}`} className="img-fluid rounded-start" alt="..." />
              </div>
              <div className="col-6">
                <div className="card-body">
                  <p className="card-text">
                    {getProductDetails?.product_name}
                  </p>
                </div>
              </div>
              <div className="col-3">
                {/* <b>Qty</b> */}
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
                <b>{getProductDetails?.price}</b>
              </div>
            </div>
          </div>
        </section>
        <br />
        <section className="row" style={{ fontSize: "12px" }}>
          <div className="col-4">
            <h4>Payment</h4>
            <b>Visa**56</b>
          </div>
          <div className="col-8">
            <div>
              <h4>Delivery</h4>
              <b>{getOrderDetails?.orderPerson}</b>
              <address>
                {getOrderDetails?.orderAddress}
              </address>
              <b>Phone Number: {getOrderDetails?.orderContact}</b>
            </div>
            <div>
              <h4>Order summary</h4>
              <div className="d-flex justify-content-between">
                <span>Order Amount</span>
                <span>₹{getProductDetails?.price}.00</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Delivery</span>
                <span>₹00</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Total </span>
                <span>₹{getProductDetails?.price}.00</span>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}

const greencircle = {
  width: "25px",
  height: "25px",
  backgroundColor: "#12B76A",
  zIndex: 10,
  borderRadius: "50%",
};
const blackcircle = {
  width: "25px",
  height: "25px",
  backgroundColor: "#000000",
  zIndex: 10,
  borderRadius: "50%",
};

export default TrackOrder;
