import React, { useState } from "react";
import { Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import ChatBox from "./chatbot";
export const Cart = ({ img, imgname, imgdescription = '', style, imgQty, imgprice, btnvalue, to }) => {
    const [quantity, setQuantity] = useState(1); // Initial quantity set to 1
    
    // console.log('item',currentUser)
    // Function to handle increasing quantity
    const increaseQty = () => {
        setQuantity(prevQty => prevQty + 1);
    };
    const decreaseQty = () => {
        if (quantity > 1) {
            setQuantity(prevQty => prevQty - 1);
        }
    };
     const currentUser = JSON.parse(localStorage.getItem("user"));
    return (
        <div>
            <Card className="mb-3 m-3" style={{ width: '90%', height: '100%', }}>
                <div>
                    <div style={{ marginTop: '5%', marginLeft: '3%', }} className=" d-flex justify-content-center">
                        <Card.Img src={img} alt={imgname} style={{ height: '100px', width: '60%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ marginLeft: '20px', marginTop: '10%', width: '100%', display: 'flex' }} className="">
                        <Card.Body>
                            <Card.Title style={{fontSize:'0.8rem'}} >{imgname.length > 12 ? imgname.substring(0, 12) + "..." : imgname }</Card.Title>
                            {/* <Card.Text>{imgdescription }</Card.Text> */}
                            {/* <Card.Text>
                                <strong>QTY:
                                    <button onClick={decreaseQty} style={{ borderStyle: 'none', backgroundColor: 'transparent' }}>-</button>
                                    <span>{quantity}</span>
                                    <button onClick={increaseQty} style={{ borderStyle: 'none', backgroundColor: 'transparent' }}>+</button>
                                </strong>
                            </Card.Text> */}
                            <Card.Text>
                                {/* <strong>Price: ${quantity && quantity > 0 ? quantity * imgprice : imgprice}</strong> */}
                                <strong style={{fontSize:'0.8rem'}}>Price: ${imgprice}</strong>
                            </Card.Text>
                            <Link to={to}>
                                <button style={{ color:'#501924', border:' 1px solid #501924',borderRadius:'5px',backgroundColor:'white',...style }}>{btnvalue}</button>

                            </Link>
                        </Card.Body>
                    </div>
                    
                </div>
            </Card>
            
        </div>
    )

}