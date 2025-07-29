import React, { useEffect, useState } from 'react';
import { Header } from '../../component/header_footer/header';
import { Footer } from '../../component/header_footer/footer';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Backend_url } from '../../constant';
import 'bootstrap/dist/css/bootstrap.min.css';

// Fallback product images
import productImg from '../../images/product.jpeg';
import treebirdsImg from '../../images/treebirds.jpeg';
import penstandImg from '../../images/penstand.jpeg';
import handfanImg from '../../images/handfan.jpeg';
import ChatBox from '../../component/chatbot';

const sampleProducts = [
  { name: 'Hand-painted Ceramic Vase', sku: 'UTT65219250', img: productImg, status: 'In Stock' },
  { name: 'Chirping Birds Wall Decor', sku: 'UTT65219251', img: treebirdsImg, status: 'In Stock' },
  { name: 'Pen Holder with Elephant Foot', sku: 'UTT65219252', img: penstandImg, status: 'In Stock' },
  { name: 'Hand Fan', sku: 'UTT65219253', status: 'Out of Stock', img: handfanImg }
];
const currentUser = JSON.parse(localStorage.getItem("user"));
const AllProducts = () => {
  const [products, setProducts] = useState(sampleProducts);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${Backend_url}/api/admin/getProduct`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts(sampleProducts); // fallback
      }
    };
    getData();
  }, []);

  const handleRemoveProduct = async (id) => {
    try {
      await axios.delete(`${Backend_url}/api/admin/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error('Error removing product:', error);
    }
  };

  return (
    <div>
      <Header label="Product" />
      <div className="container">
        <div className="d-flex justify-content-end my-3">
          <Link to="/AddProduct">
            <button className="btn btn-success">+ Add Product</button>
          </Link>
        </div>

        <div className="row" style={{ marginBottom:'10%'}}>
          {products.map((product, index) => {
            const imageSrc = product.imgName
              ? `${Backend_url}/api/admin/image/${product.imgName}`
              : sampleProducts[index % sampleProducts.length].img;
             console.log(product.status)
            return (
              <div className="col-md-6 col-lg-4 mb-5" key={index} >
                <div className="card h-100">
                  <img
                    src={imageSrc}
                    className="card-img-top"
                    alt={product.product_name}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.product_name}</h5>
                    <p className="card-text">SKU#: {product.sku}</p>
                    <p>
                      <span className={`badge ${product.status === 'In Stock' ? 'bg-success' : 'bg-danger'}`}>
                        {product.status || 'Out of Stock'}
                      </span>
                    </p>
                    <p className="fw-bold">₹ {product.price}</p>

                    <div className="mt-auto d-flex justify-content-between">
                      <Link to={`/product/${product._id}`}>
                        <button className="btn btn-outline-primary btn-sm">View Details</button>
                      </Link>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleRemoveProduct(product._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div>
          <ChatBox currentUserId={currentUser._id} targetUserId={''}/>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllProducts;
