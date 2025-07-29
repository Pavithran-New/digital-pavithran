import React, { useEffect, useState } from "react";
import axios from "axios";
import { Footer } from "../../component/header_footer/footer";
import { Backend_url } from "../../constant";

function OrderProgressBar() {
  const [orderData, setOrderData] = useState([]);

  const getOrder = async () => {
    try {
      const res = await axios.get(`${Backend_url}/api/admin/get/order`);
      setOrderData(res.data?.updatedProduct || []);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  const completedOrders = orderData.filter(
    (item) => item.orderStatus === "Confirm"
  );
  const pendingOrders = orderData.filter(
    (item) => item.orderStatus === "Request"
  );
  const cancelledOrders = orderData.filter((item) =>
    ["Rejected", "Canceled"].includes(item.orderStatus)
  );

  const progressValues = [40, 60, 20, 50, 70]; // Placeholder for actual chart values

  return (
    <>
      <header className="bg-dark text-white text-center p-3 sticky-top">
        <h4 className="mb-1">ETHICRAZE</h4>
        <small>"Unleash Your Inner Artisan"</small>
      </header>

      <div className="container mt-4 mb-5">
        {/* Vertical Chart */}
        <div className="border rounded p-3 position-relative mb-4">
          <div style={verticalChart}>
            <div style={yaxis}>
              {[700, 600, 500, 400, 300, 200, 100, 0].map((val) => (
                <div key={val}>{val}</div>
              ))}
            </div>
            <div style={barsContainer}>
              {progressValues.map((value, index) => (
                <div key={index} style={barItem}>
                  <div
                    style={{
                      width: "80%",
                      height: `${value}%`,
                      backgroundColor: "#85b6ff",
                    }}
                  />
                  <p style={barItemP}>Day {index + 1}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={xAxisTitle}>X-Axis: Days</div>
          <div style={yAxisTitle}>Y-Axis: Order %</div>
        </div>

        {/* Order Stats */}
        <div className="row" style={{marginBottom:'8%'}}>
          <OrderStat title="Total Orders" value={orderData.length} />
          <OrderStat title="Completed Orders" value={completedOrders.length} />
          <OrderStat title="Pending Orders" value={pendingOrders.length} />
          <OrderStat title="Rejected Orders" value={cancelledOrders.length} />
        </div>
      </div>

      <footer style={footer}>
        <Footer />
      </footer>
    </>
  );
}

const OrderStat = ({ title, value }) => (
  <div className="col-md-6 col-lg-3 mb-3">
    <div className="bg-secondary text-white p-3 rounded text-center">
      <h6>{title}</h6>
      <h5>{value}</h5>
    </div>
  </div>
);

const verticalChart = {
  display: "flex",
  alignItems: "flex-end",
  height: "300px",
  width: "100%",
  margin: "0 auto",
  gap: "20px",
  padding: "1rem",
};

const barsContainer = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  width: "100%",
};

const barItem = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-end",
  height: "300px",
};

const barItemP = {
  marginTop: "10px",
  textAlign: "center",
};

const yaxis = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "100%",
  marginRight: "10px",
};

const xAxisTitle = {
  position: "absolute",
  bottom: 0,
  width: "100%",
  textAlign: "center",
};

const yAxisTitle = {
  position: "absolute",
  left: 0,
  top: "50%",
  transform: "rotate(270deg)",
  transformOrigin: "left top",
};

const footer = {
  position: "fixed",
  bottom: 0,
  width: "100%",
};

export default OrderProgressBar;
