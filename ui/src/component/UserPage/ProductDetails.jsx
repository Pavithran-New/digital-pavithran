import React, { useEffect, useState } from "react";
import { Header } from "../header_footer/header";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Backend_url } from "../../constant";
import { BiSolidShoppingBagAlt } from "react-icons/bi";
import { GoQuestion } from "react-icons/go";
import { GiCheckMark } from "react-icons/gi";
import ChatBox from "../chatbot";

const ProductDetails = () => {
  const { skuid } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const userdata = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
    console.log(product)
  useEffect(() => {
    axios
      .get(`${Backend_url}/api/admin/getProduct/${skuid}`)
      .then((res) => setProduct(res.data));
  }, [skuid]);

  const handleAddToCart = async () => {
    try {
      await axios.post(`${Backend_url}/api/auth/addProducts/${userdata.email}`, {
        skuid,
      });
      navigate("/YourCart");
    } catch (error) {
      console.log(error);
    }
  };

  const handleQuantityChange = (e) => {
    const val = parseInt(e.target.value);
    if (val >= 1) setQuantity(val);
  };
const currentUser = JSON.parse(localStorage.getItem("user"));
  return (
    <div>
      <Header label="Product" />

      <div className="container my-4">
        <div className="text-center">
          <img
            src={`${Backend_url}/api/admin/image/${product.imgName}`}
            alt="Product"
            className="img-fluid mb-4"
            style={{ maxHeight: "300px", objectFit: "contain" }}
          />
        </div>

        <h2 className="text-center text-primary">{product.product_name}</h2>

        <div className="row mt-3">
          <div className="col-md-6">
            <p className="fst-italic text-muted">Be the first to review this product</p>
          </div>
          <div className="col-md-6 text-md-end">
            <p className="text-success fw-bold">In stock</p>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <h4 className="text-warning">₹{product.price}</h4>
          <p className="text-muted">SKU#: {product.product_number}</p>
        </div>

        <div className="row my-3">
          <div className="col-6 col-md-4">
            <label className="form-label fw-bold">Qty</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              className="form-control"
              style={{ width: "80px" }}
            />
          </div>
          <div className="col-6 d-flex align-items-end justify-content-end">
            <button className="btn btn-link text-dark d-flex align-items-center">
              <BiSolidShoppingBagAlt size={24} />
              <span className="ms-2 fw-bold">Add to Wishlist</span>
            </button>
          </div>
        </div>

        <div className="text-center my-4 d-grid gap-2 d-md-flex justify-content-center">
          <button className="btn btn-dark px-4" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <Link to={`/payment/${product._id}`} className="btn btn-primary px-4">
            Buy Now
          </Link>
        </div>
        <div>
          {/* <h4>Chat With Admin</h4> */}
          <ChatBox  targetUserId={product.admin_id}/>
        </div>
        <div className="mt-3">
          <p className="text-primary"><GoQuestion /> Size Chart</p>
          <p className="text-primary"><GiCheckMark /> Easy 15 days return option available</p>
        </div>

        <div className="mt-4">
          <h5 className="text-secondary">Product Description</h5>
          <p>{product.discription}</p>
        </div>

        <h5 className="text-primary mt-4">Salient Features</h5>
        <ul className="list-unstyled">
          <li><strong>Product Category:</strong> {product.product_category}</li>
          <li><strong>Product Type:</strong> {product.product_type}</li>
          <li><strong>Item Type:</strong> Handicraft</li>
          <li><strong>Size:</strong> {product.size}</li>
          <li><strong>Color:</strong> {product.color}</li>
        </ul>

        <div className="mt-3">
          <h6>Sold By</h6>
          <p className="text-primary">Maya Products</p>
        </div>

        <div className="mt-4">
          <h6 className="text-primary">Product Details</h6>
          <p>{product.discription}</p>

          <p className="fst-italic text-muted mt-3">
            <strong>PRODUCT DISCLAIMER:</strong> This product is handmade and may
            have slight variations or dissimilarities due to human involvement. These
            minor variations add charm and ensure uniqueness.
          </p>

          <p className="fst-italic text-muted">
            <strong>PRODUCT QUALITY DISCLAIMER:</strong> All sellers on ETHICRAZE are
            verified artisans and producers. They commit to sell authentic handmade
            items. Quality/authenticity responsibility lies with the sellers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
