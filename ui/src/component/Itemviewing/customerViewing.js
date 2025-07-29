import React, { useState, useEffect } from "react";
import { Cart } from "../cartPage";
import { Header } from "../header_footer/header";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { Backend_url } from "../../constant";

const CustomerItemview = () => {
    const { item } = useParams();
    const [getData1, setgetData1] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6); // Slightly increased for larger screens

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(`${Backend_url}/api/admin/getProduct`);
                setgetData1(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        getData();
    }, []);

    useEffect(() => {
        const filtered = getData1.filter(prod => prod.product_type === item);
        setFilteredProducts(filtered);
    }, [item, getData1]);

    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <Header label={'PRODUCTS'} />
            <div className="container my-4">
                <div className="row g-4">
                    {currentProducts.length > 0 ? (
                        currentProducts.map((product) => {
                            const productImage = `${Backend_url}/api/admin/image/${product.imgName}`;
                            return (
                                <div className="col-12 col-md-6 col-lg-4" key={product._id}>
                                    <Cart 
                                        img={productImage} 
                                        imgname={product.product_name} 
                                        imgQty={1} 
                                        imgprice={product.price} 
                                        btnvalue='View Cart' 
                                        to={`/ProductDetails/${product._id}`} 
                                    />
                                </div>
                            );
                        })
                    ) : (
                        <div className="col-12 text-center text-muted">
                            No products found for this category.
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="d-flex justify-content-center mt-4">
                        <nav>
                            <ul className="pagination">
                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                    <button 
                                        className="page-link"
                                        onClick={() => paginate(currentPage - 1)}
                                        disabled={currentPage === 1}
                                    >
                                        Previous
                                    </button>
                                </li>
                                {[...Array(totalPages)].map((_, index) => (
                                    <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                        <button 
                                            className="page-link"
                                            onClick={() => paginate(index + 1)}
                                        >
                                            {index + 1}
                                        </button>
                                    </li>
                                ))}
                                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                    <button 
                                        className="page-link"
                                        onClick={() => paginate(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                    >
                                        Next
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomerItemview;
