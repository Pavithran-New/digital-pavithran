import React from "react"; 
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";
import homeIcon from "../../images/icons/home.png";
import cartIcon from "../../images/icons/cart.png";
import searchIcon from "../../images/icons/search.png";
import categoryIcon from "../../images/icons/category.png";
import profileIcon from "../../images/icons/profile.png";
import ProductIcon from "../../images/icons/product.png";
import orderIcon from "../../images/icons/order.png";
import paymentIcon from "../../images/icons/payment.png";

export const Footer = () => {
    const {role} = JSON.parse(localStorage.getItem("user"))
    // console.log('',role)

    return (
        <div>
            {role === 'admin' ? (
                <div className="container-fluid" style={{ padding: '4px 4px 4px 6px', position: 'fixed', bottom: '0', borderTopLeftRadius: '5px', borderTopRightRadius: '5px', color: 'black', border: '1px solid blue', borderRadius: '20px', backgroundColor: 'white', gap: '5px' }}>
                    <div className="row">
                        <Nav className="d-flex justify-content-between w-100">
                            <Nav.Item className="flex-fill text-center">
                                <Nav.Link>
                                    <Link to="/OrderProgressBar" style={{ textDecoration: 'none', color: 'black' }}>
                                        <img src={homeIcon} alt="Home" style={{ width: '20px', height: '20px' }} />
                                        <br /><span style={{fontSize: '12px'}}>Home</span>
                                    </Link>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="flex-fill text-center">
                                <Nav.Link>
                                    <Link to="/AllProducts" style={{ textDecoration: 'none', color: 'black' }}>
                                        <img src={ProductIcon} alt="Products" style={{ width: '20px', height: '20px' }} />
                                        <br /> <span style={{fontSize: '12px'}}>Products</span>
                                    </Link>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="flex-fill text-center">
                                <Nav.Link>
                                    <Link to="/UpAndPreviousOrder" style={{ textDecoration: 'none', color: 'black' }}>
                                        <img src={orderIcon} alt="Order" style={{ width: '20px', height: '20px' }} />
                                        <br /><span style={{fontSize: '12px'}}>Order</span>
                                    </Link>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="flex-fill text-center">
                                <Nav.Link>
                                    <Link to="/TrackShipment" style={{ textDecoration: 'none', color: 'black' }}>
                                        <img src={paymentIcon} alt="Payment" style={{ width: '20px', height: '20px' }} />
                                        <br /><span style={{fontSize: '12px'}}>Track-Order</span>
                                    </Link>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="flex-fill text-center">
                                <Nav.Link>
                                    <Link to="/Profile" style={{ textDecoration: 'none', color: 'black' }}>
                                        <img src={profileIcon} alt="Profile" style={{ width: '20px', height: '20px' }} />
                                        <br /><span style={{fontSize: '12px'}}>Profile</span>
                                    </Link>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="flex-fill text-center">
                                <Nav.Link>
                                    <Link to="/register" style={{ textDecoration: 'none', color: 'black' }}>
                                        <img src={profileIcon} alt="AddUser" style={{ width: '20px', height: '20px' }} />
                                        <br /><span style={{fontSize: '12px'}}>Add User</span>
                                    </Link>
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                </div>
            ) : (
                <div className="container-fluid" style={{ padding: '4px 4px 4px 6px', position: 'fixed', bottom: '0', borderTopLeftRadius: '5px', borderTopRightRadius: '5px', color: 'black', border: '1px solid blue', borderRadius: '20px', backgroundColor: 'white' }}>
                    <div className="row">
                        <Nav className="d-flex justify-content-between w-100">
                            <Nav.Item className="flex-fill text-center">
                                <Nav.Link>
                                    <Link to="/customer" style={{ textDecoration: 'none', color: 'black' }}>
                                        <img src={homeIcon} alt="Home" style={{ width: '25px', height: '25px' }} />
                                        <br /><span style={{fontSize: '12px'}}>Home</span>
                                    </Link>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="flex-fill text-center">
                                <Nav.Link>
                                    <Link to={`/YourCart`} style={{ textDecoration: 'none', color: 'black' }}>
                                        <img src={cartIcon} alt="Cart" style={{ width: '25px', height: '25px' }} />
                                        <br /><span style={{fontSize: '12px'}}>Cart</span>
                                    </Link>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="flex-fill text-center">
                                <Nav.Link>
                                    <Link to="/categories" style={{ textDecoration: 'none', color: 'black' }}>
                                        <img src={searchIcon} alt="Search" style={{ width: '25px', height: '25px' }} />
                                        <br /><span style={{fontSize: '12px'}}>Search</span>
                                    </Link>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="flex-fill text-center">
                                <Nav.Link>
                                    <Link to="/categories" style={{ textDecoration: 'none', color: 'black' }}>
                                        <img src={categoryIcon} alt="Category" style={{ width: '25px', height: '25px' }} />
                                        <br /><span style={{fontSize: '12px'}}>Category</span>
                                    </Link>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="flex-fill text-center">
                                <Nav.Link>
                                    <Link to="/UserProfile" style={{ textDecoration: 'none', color: 'black' }}>
                                        <img src={profileIcon} alt="Profile" style={{ width: '25px', height: '25px' }} />
                                        <br /><span style={{fontSize: '12px'}}>Profile</span>
                                    </Link>
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                </div>
            )}
        </div>
    );
};
