import React, { useState, useEffect } from "react";
import { FaCartShopping } from "react-icons/fa6";
import "bootstrap/dist/css/bootstrap.min.css";
import "./customer.css";
import { InputGroup, FormControl } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import sale1 from "../../images/home/astisan_eng.jpg";
import sale2 from "../../images/home/craftting_eng.jpg";
import sale3 from "../../images/home/handicraft_eng.jpg";
import sale4 from "../../images/home/image.png";
import sale6 from "../../images/home/seller_step_eng.jpg";
import searchImg from "../../images/icons/searchionc.png";
import { Modelbutton } from "./categoryBox";
import { Link, useNavigate } from "react-router-dom";
import { Footer } from "../header_footer/footer";
import axios from "axios";
import { Backend_url } from "../../constant";

const productData = [
  { _id: "1", route: "Mens" },
  { _id: "2", route: "Womens" },
  { _id: "3", route: "Bags" },
  // { _id: "4", route: "Furnshing" },
  { _id: "5", route: "Decor" },
  { _id: "6", route: "Furniture" },
  { _id: "7", route: "Kitchen" },
  { _id: "8", route: "Footwear" },
];

const CustomerDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetchFilters();
    fetchProducts(searchQuery, selectedCategory);
  }, [searchQuery, selectedCategory]);

  const fetchFilters = async () => {
    try {
      const response = await axios.get(`${Backend_url}/api/admin/getProduct`);
      setFilters(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProducts = async (query = "", category = "") => {
    try {
      const response = await axios.get(`${Backend_url}/api/admin/products`, {
        params: { search: query, category },
      });
      setFilters(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = (e) => setSearchQuery(e.target.value);
  const navigate = useNavigate();

  return (
    <div>
      {/* Header */}
      <div className="container-fluid py-3 px-4 sticky-top bg-white border-bottom" style={{ zIndex: "1000" }}>
        <div className="row align-items-center">
          <div className="col-md-6">
            <h3 className="text-uppercase fw-bold" style={{ color: "#501924" }}>
              <i>ETHICRAZE</i>
            </h3>
            <p className="text-success m-0">"Unleash Your Inner Artisian"</p>
          </div>
          <div className="col-md-6 text-end">
            <FaCartShopping style={{ fontSize: "30px", cursor: "pointer" }} onClick={() => navigate("/YourCart")} />
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8">
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Search"
                aria-label="Search"
                value={searchQuery}
                onChange={handleSearch}
              />
              <InputGroup.Text>
                <img src={searchImg} alt="search icon" width="20" height="20" />
              </InputGroup.Text>
            </InputGroup>
          </div>
        </div>
      </div>

      {/* Filtered Products */}
      {searchQuery && (
        <div className="container mb-5">
          <h4 className="text-primary mb-3"><b>Shop By Category</b></h4>
          <hr />
          <div className="row g-4">
            {filters.map((filter) => (
              <div className="col-sm-6 col-md-4 col-lg-3" key={filter._id}>
                <div className="card h-100">
                  <img
                    src={`${Backend_url}/api/admin/image/${filter.imgName}`}
                    className="card-img-top img-fluid"
                    alt={filter.product_name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{filter.product_name}</h5>
                    <p className="card-text flex-grow-1">{filter.discription}</p>
                    <Link to={`/ProductDetails/${filter._id}`} className="btn btn-primary mt-auto">
                      Buy
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Carousel */}
      <div className="container mb-5">
        <Carousel>
          <Carousel.Item>
            <Link to="/customerItemview/Mens">
              <img className="d-block w-100 img-fluid" src={sale1} alt="Mens" style={{ height: "200px", objectFit: "cover" }} />
            </Link>
          </Carousel.Item>
          <Carousel.Item>
            <Link to="/customerItemview/Decor">
              <img className="d-block w-100 img-fluid" src={sale2} alt="Decor" style={{ height: "200px", objectFit: "cover" }} />
            </Link>
          </Carousel.Item>
          <Carousel.Item>
            <Link to="/customerItemview/Womens">
              <img className="d-block w-100 img-fluid" src={sale3} alt="Womens" style={{ height: "200px", objectFit: "cover" }} />
            </Link>
          </Carousel.Item>
        </Carousel>
      </div>

      {/* Product Categories */}
      <div className="container mb-5">
        <h4 className="text-primary"><b>Products</b></h4>
        <hr />
        <div className="d-flex flex-wrap justify-content-center gap-3">
          {productData.map((p) => (
            <Link to={`/customerItemview/${p.route}`} key={p._id}>
              <Modelbutton label={p.route} style={buttonStyle} />
            </Link>
          ))}
        </div>
      </div>

      {/* Promotional Banners */}
      <div className="container mb-5">
        <div className="mb-3">
          <img src={sale6} alt="Seller Steps" className="img-fluid rounded" />
        </div>
        <div>
          <img src={sale4} alt="Craft Promotion" className="img-fluid rounded" />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

const buttonStyle = {
  background: "#2C647C",
  color: "white",
  borderRadius: "5px",
  padding: "10px 20px",
  margin: "5px",
  textAlign: "center",
  fontSize: "18px",
  minWidth: "150px",
  display: "inline-block",
};

export default CustomerDashboard;
