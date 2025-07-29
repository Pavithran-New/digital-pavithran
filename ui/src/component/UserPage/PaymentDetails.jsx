import React, { useState } from "react";
import { Header } from "../header_footer/header";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import gpay from "../../images/gpay.png";
import paytm from "../../images/paytm.png";
import phonepe from "../../images/phonepe.png";
import apay from "../../images/amzonpay.png";
import qr from "../../images/gq.png";

const PaymentDetails = () => {
  const { search } = useLocation();
  const { id } = useParams();
  const { quantity } = useParams();
  const queryParams = new URLSearchParams(search);
  const method = queryParams.get("method");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    expMonth: "",
    expYear: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({
    cardName: "",
    cardNumber: "",
    expMonth: "",
    expYear: "",
    cvv: "",
  });

  const years = Array.from({ length: 11 }, (_, i) => 2020 + i);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (method === "credit-card") {
      if (!formData.cardName) newErrors.cardName = "Name on Card is required";
      if (!formData.cardNumber)
        newErrors.cardNumber = "Card Number is required";
      if (!formData.expMonth)
        newErrors.expMonth = "Expiration Month is required";
      if (!formData.expYear) newErrors.expYear = "Expiration Year is required";
      if (!formData.cvv) newErrors.cvv = "CVV is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate(`/PlaceOrder/${id}/${quantity}`);
    }
  };

  return (
    <div>
      <Header label={"Payment"} />
      {method === "credit-card" && (
        <>
          <h4 className="text-center mt-4 p-3" style={{ color: "#333" }}>
            Enter Your Payment Details
          </h4>
          <div className="p-4 rounded" style={{ margin: "20% 5%" }}>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Name on Card"
                  aria-label="Name on Card"
                  style={{ borderColor: "#ccc", color: "#333" }}
                />
                {errors.cardName && (
                  <p className="text-danger">{errors.cardName}</p>
                )}
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Card Number"
                  aria-label="Card Number"
                  style={{ borderColor: "#ccc", color: "#333" }}
                />
                {errors.cardNumber && (
                  <p className="text-danger">{errors.cardNumber}</p>
                )}
              </div>

              <div className="d-flex justify-content-between gap-3">
                <div className="mb-3 w-50">
                  <select
                    name="expMonth"
                    value={formData.expMonth}
                    onChange={handleChange}
                    className="form-control"
                    aria-label="Select Month"
                    style={{ borderColor: "#ccc" }}
                  >
                    <option value="" disabled>
                      Select Month
                    </option>
                    {months.map((month, index) => (
                      <option key={index} value={index + 1}>
                        {month}
                      </option>
                    ))}
                  </select>
                  {errors.expMonth && (
                    <p className="text-danger">{errors.expMonth}</p>
                  )}
                </div>

                <div className="mb-3 w-50">
                  <select
                    name="expYear"
                    value={formData.expYear}
                    onChange={handleChange}
                    className="form-control"
                    aria-label="Select Year"
                    style={{ borderColor: "#ccc" }}
                  >
                    <option value="" disabled>
                      Select Year
                    </option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  {errors.expYear && (
                    <p className="text-danger">{errors.expYear}</p>
                  )}
                </div>
              </div>

              <div className="d-flex gap-3">
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="CVV"
                  aria-label="CVV"
                  style={{ borderColor: "#ccc", width: "50%" }}
                />
                <div>
                  <p>3 or 4 digits usually found on the signature strip</p>
                </div>
                {errors.cvv && <p className="text-danger">{errors.cvv}</p>}
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: "100%", marginTop: "20%" }}
              >
                PAY
              </button>
            </form>
          </div>
        </>
      )}

      {method === "net-banking" && (
        <>
          <h4 className="text-center mt-4 p-3" style={{ color: "#333" }}>
            Net Banking Payment
          </h4>
          <div className="p-4 rounded" style={{ margin: "20% 5%" }}>
            {/* Net Banking payment details form here */}
          </div>
        </>
      )}

      {method === "paypal" && (
        <>
          <h4 className="text-center mt-4 p-3" style={{ color: "#333" }}>
            PayPal Payment
          </h4>
          <div className="p-4 rounded" style={{ margin: "20% 5%" }}>
            {/* PayPal payment details form here */}
          </div>
        </>
      )}

      {method === "upi" && (
        <>
          <h4 className="text-center mt-4 p-3" style={{ color: "#333" }}>
            Select a UPI Payment Method
          </h4>
          <div style={{ width: "100%", maxWidth: "600px", color: "#1674AE" }}>
            <ul style={{ listStyleType: "none", padding: "10px", margin: "0" }}>
              <li
                style={{
                  margin: "10px 0",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src={gpay}
                  alt="Google Pay"
                  style={{ height: "40px", marginRight: "10px" }}
                />
                <Link
                  to={`/PlaceOrder/${id}/${quantity}`}
                  style={{
                    textDecoration: "none",
                    color: "#1674AE",
                    flex: 1,
                    textAlign: "center",
                  }}
                >
                  Google Pay
                </Link>
                <FaAngleRight size={24} style={{ color: "#1674AE" }} />
              </li>
              <hr style={{ margin: "10px 0" }} />
              <li
                style={{
                  margin: "10px 0",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src={paytm}
                  alt="PayTM"
                  style={{ height: "40px", marginRight: "10px" }}
                />
                <Link
                  to={`/PlaceOrder/${id}/${quantity}`}
                  style={{
                    textDecoration: "none",
                    color: "#1674AE",
                    flex: 1,
                    textAlign: "center",
                  }}
                >
                  PayTM
                </Link>
                <FaAngleRight size={24} style={{ color: "#1674AE" }} />
              </li>
              <hr style={{ margin: "10px 0" }} />
              <li
                style={{
                  margin: "10px 0",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src={phonepe}
                  alt="PhonePe"
                  style={{ height: "40px", marginRight: "10px" }}
                />
                <Link
                  to={`/PlaceOrder/${id}/${quantity}`}
                  style={{
                    textDecoration: "none",
                    color: "#1674AE",
                    flex: 1,
                    textAlign: "center",
                  }}
                >
                  PhonePe
                </Link>
                <FaAngleRight size={24} style={{ color: "#1674AE" }} />
              </li>
              <hr style={{ margin: "10px 0" }} />
              <li
                style={{
                  margin: "10px 0",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src={apay}
                  alt="Amazon Pay"
                  style={{ height: "40px", marginRight: "10px" }}
                />
                <Link
                  to={`/PlaceOrder/${id}/${quantity}`}
                  style={{
                    textDecoration: "none",
                    color: "#1674AE",
                    flex: 1,
                    textAlign: "center",
                  }}
                >
                  Amazon Pay
                </Link>
                <FaAngleRight size={24} style={{ color: "#1674AE" }} />
              </li>
              <hr style={{ margin: "10px 0" }} />
              <li
                style={{
                  margin: "10px 0",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src={qr}
                  alt="QR Code"
                  style={{ height: "40px", marginRight: "10px" }}
                />
                <Link
                  to={`/PlaceOrder/${id}/${quantity}`}
                  style={{
                    textDecoration: "none",
                    color: "#1674AE",
                    flex: 1,
                    textAlign: "center",
                  }}
                >
                  QR Code
                </Link>
                <FaAngleRight size={24} style={{ color: "#1674AE" }} />
              </li>
            </ul>
          </div>
        </>
      )}

      {method === "cash-on-delivery" && (
        <>
          <h4 className="text-center mt-4 p-3" style={{ color: "#333" }}>
            Cash On Delivery
          </h4>
          <div className="p-4 rounded" style={{ margin: "20% 5%" }}>
            <p style={{ fontSize: "16px", color: "#333" }}>
              Please ensure that you have the exact amount ready when the
              delivery arrives.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentDetails;
