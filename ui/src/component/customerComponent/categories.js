import React from "react";
import { Header } from "../header_footer/header";
import { Footer } from "../header_footer/footer";
import sale1 from '../../images/home/astisan_eng.jpg';
import sale2 from '../../images/home/craftting_eng.jpg';
import sale3 from '../../images/home/handicraft_eng.jpg';
import { Carousel } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";


export const Categories_cus = () => {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        const title = event.target.value;
        navigate(`/customerItemview/${title}`);
    };


    return (
        <div>
            <div style={{ position: 'sticky', top: '0', zIndex: '1000' }}>
                <Header label={'CATEGORIES'} />
            </div>
            <div className="mt-1">
                <Carousel>
                    <Carousel.Item>
                        <img src={sale1} alt="saleimage" style={{ height: '200px', width: '100%' }} />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={sale2} alt="saleimage" style={{ height: '200px', width: '100%' }} />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={sale3} alt="saleimage" style={{ height: '200px', width: '100%' }} />
                    </Carousel.Item>
                </Carousel>
            </div>
            <div className="mt-3 d-flex justify-content-center">
                <select style={{ width: '80%', padding: '3px 4px', backgroundColor: '#925e69', borderRadius: '5px', color: 'white', fontSize: '20px' }} onChange={handleSubmit}>
                    <option value="Decor" selected>Home and Living</option>
                    <option value="Decor">Home Decor and Utility</option>
                    <option value="Decor">Home Furnishings</option>
                    <option value="Decor">Stationery</option>
                    <option value="Decor">Kitchen and Dining</option>
                    <option value="Decor">Lighting</option>
                    <option value="Decor">Accessories</option>
                </select>
            </div>
            <div className="mt-3 d-flex justify-content-center">
                <select style={{ width: '80%', padding: '3px 4px', backgroundColor: '#925e69', borderRadius: '5px', color: 'white', fontSize: '20px' }} onChange={handleSubmit}>
                    <option value='Mens' selected>Mens Wear</option>
                    <option value='Mens'>Ethnic Wears</option>
                    <option value='Mens'>Western Wears</option>
                    <option value='Mens'>Accessories</option>
                    <option value='Mens'>Footwears</option>
                </select>
            </div>
            <div className="mt-3 d-flex justify-content-center">
                <select style={{ width: '80%', padding: '3px 4px', backgroundColor: '#925e69', borderRadius: '5px', color: 'white', fontSize: '20px' }} onChange={handleSubmit}>
                    <option value='Womens' selected>Womens Wear</option>
                    <option value='Womens'>Ethnic Wears</option>
                    <option value='Womens'>Western Wears</option>
                    <option value='Womens'>Accessories</option>
                    <option value='Womens'>Footwears</option>
                </select>
            </div>
            <div className="mt-3 d-flex justify-content-center">
                <select style={{ width: '80%', padding: '3px 4px', backgroundColor: '#925e69', borderRadius: '5px', color: 'white', fontSize: '20px' }} onChange={handleSubmit}>
                    <option value='Kitchen' selected>Kitchen</option>
                    <option value='Kitchen'>Kitchen Decors</option>
                    <option value='Kitchen'>Glass</option>
                    <option value='Kitchen'>Spoons</option>
                </select>
            </div>
            <div className="mt-3 d-flex justify-content-center">
                <select style={{ width: '80%', padding: '3px 4px', backgroundColor: '#925e69', borderRadius: '5px', color: 'white', fontSize: '20px' }} onChange={handleSubmit}>
                    <option value='Furniture' selected>Furniture</option>
                    <option value='Furniture'>Home Indoors</option>
                    <option value='Furniture'>Home Outdoors</option>
                    <option value='Furniture'>Offices</option>
                </select>
            </div>
            <div className="mt-3 d-flex justify-content-center">
                <select style={{ width: '80%', padding: '3px 4px', backgroundColor: '#925e69', borderRadius: '5px', color: 'white', fontSize: '20px' }} onChange={handleSubmit}>
                    <option value='Footwear' selected>Footwear</option>
                    <option value='Footwear'>Footwear</option>
                </select>
            </div>
            <div style={{ position: 'fixed', bottom: '0', zIndex: '1000', width: '100%' }}>
                <Footer />
            </div>
        </div>
    );
};
