import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import '../dashBoard/customer.css'
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { InputGroup, FormControl } from 'react-bootstrap';
import searchImg from '../../images/icons/searchionc.png';


export const Header = ({ label,to=-1 }) => {
const navigate = useNavigate()
const goBack = () => {
    navigate(to);
  };
    return (
        <div>
            <div className="container-fluit" style={{ backgroundColor: '#925e69', padding: '10px 2px 2px 4px', height: '', position: 'sticky', top: '0', zIndex: '1000', borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px' }} >
                <div className="row g-2">

                    <div className="col-9">
                        <div style={{ fontSize: '25px' ,color:'white'}}><IoIosArrowBack  onClick={goBack} />
                        {label}</div>
                    </div>
                    <div className="col-3" style={{ textAlign: 'end', }} >
                        <FiShoppingCart style={{ fontSize: '30px' ,color:'white',marginTop:'10px',marginRight:'10px'}} onClick={()=>{navigate('/YourCart')}} />
                    </div>

                </div>
                <br/>
                <div className="d-flex justify-content-center w-100">
                {/* <InputGroup className="mb-3" style={{ width: '80%', border: '3px', }}>
                    <FormControl
                        placeholder="Search here..."
                        aria-label="Search"
                        aria-describedby="basic-addon1"
                        id="searchhere"
                        
                    />
                    <InputGroup.Text>
                        <img src={searchImg} width={'20px'} height={'20px'} />
                    </InputGroup.Text>
                </InputGroup> */}
                </div>
            </div>
        </div>
    );
};
