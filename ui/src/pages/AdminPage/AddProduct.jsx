import React, { useState } from 'react';
import { Header } from '../../component/header_footer/header';
import axios from 'axios';
import { Backend_url } from '../../constant';
import { Link, useNavigate } from 'react-router-dom';


const AddProduct = () => {
    const formStyle = {
        // color: '#333',
    };

    const labelStyle = {
        fontWeight: 'bold',
        // color: '#333', // Darker label color
    };

    const inputStyle = {
        borderColor: '#333',
        color: '#333',
    };
    const [productvalue, setProductvalue] = useState({});
    const [getFile, setgetFile] = useState();
    const navigate = useNavigate()
    const getValue = (e) => {
        const name = e.target.name;
        setProductvalue({ ...productvalue, [name]: e.target.value }) 
    }
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const admnid=currentUser._id;
    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', getFile);
        formData.append('admin_id',admnid)
        // console.log(getFile)
        for (const key in productvalue) {
            formData.append(key, productvalue[key]);
          }
        // formData.append(productvalue);
        // console.log(formData)
       const data = axios.post(`${Backend_url}/api/admin/addproduct`,formData).then((res)=>console.log(res.data))
       navigate('/RemoveProduct/add')
    }
    
    return (
        <div style={{ maxWidth: '100%', margin: '0 auto', padding: '20px', borderRadius: '8px', }}>
            <Header label={'Add Product'} />
            {/* <form style={formStyle}> */}
                {/* Product Name */}
                <div className="form-group mb-3">
                    <label htmlFor="productName" style={labelStyle}>Product Name</label>
                    <input type="text" name='product_name' className="form-control" id="productName" style={inputStyle} onChange={(e) => getValue(e)} />
                </div>

                {/* Product Number */}
                <div className="form-group mb-3">
                    <label htmlFor="productNumber" style={labelStyle}>Product Number</label>
                    <input type="text" name='product_number' className="form-control" id="productNumber" style={inputStyle} onChange={(e) => getValue(e)} />
                </div>

                {/* Category */}
                <div className="form-group mb-3">
                    <label htmlFor="category" style={labelStyle}>Type</label>
                    <input type="text" name='product_category' className="form-control" id="category" style={inputStyle} onChange={(e) => getValue(e)} />
                </div>

                {/* Type */}
                {/* <div className="form-group mb-3">
                    <label htmlFor="type" style={labelStyle}>Type</label>
                    <input type="text" name='product_type' className="form-control" id="type" style={inputStyle} onChange={(e) => getValue(e)} />
                </div> */}

                {/* Product Description */}
                <div className="form-group mb-3">
                    <label htmlFor="productDescription" style={labelStyle}>Product Description</label>
                    <textarea name='discription' className="form-control" id="productDescription" rows="4" style={inputStyle} onChange={(e) => getValue(e)} /> 
                </div>

                {/* Salient Features */}
                <h6 style={{ color: '#333' }}>Salient Features</h6>

                {/* Item Type */}
                {/* <div className="form-group mb-3">
                    <label htmlFor="itemType" style={labelStyle}>Item Type:</label>
                    <input type="text" name='product_type' className="form-control" id="itemType" style={inputStyle}  />
                </div> */}

                <div className="form-group mb-3">
                 <h6>Product type</h6>
                    <select style={{ width: '100%', padding: '3px 4px', borderRadius: '5px', color: 'black', fontSize: '16px' }} name='product_type' onChange={(e)=>getValue(e)}>
                        
                        <option value="" selected>Categories</option>
                        <option value="Mens">Mens</option>
                        <option value="Womens">Womens</option>
                        <option value="Bags">Bags</option>
                        <option value="Furnshing">Furnshing</option>
                        <option value="Decor">Decor</option>
                        <option value="Furniture">Furniture</option>
                        <option value="Kitchen">Kitchen</option>
                        <option value="Footwear">Footwear</option>
                    </select>
                </div >

                {/* Size */}
                <div className="form-group mb-3">
                    <label htmlFor="size" style={labelStyle}>Size (in Dimension(cm)):</label>
                    <input type="text" name='size' className="form-control" id="size" style={inputStyle} onChange={(e) => getValue(e)} />
                </div>

                {/* Colour */}
                <div className="form-group mb-3">
                    <label htmlFor="colour" style={labelStyle}>Colour</label>
                    <input type="text" name='color' className="form-control" id="colour" style={inputStyle} onChange={(e) => getValue(e)} />
                </div>

                {/* Occasion */}
                {/* <div className="form-group mb-3">
                    <label htmlFor="occasion" style={labelStyle}>Occasion</label>
                    <input type="text" className="form-control" id="occasion" style={inputStyle} />
                </div> */}

                {/* Product Detail */}
                {/* <div className="form-group mb-3">
                    <label htmlFor="productDetail" style={labelStyle}>Product Detail (Max 1000 words)</label>
                    <textarea className="form-control" id="productDetail" rows="10" style={inputStyle}></textarea>
                </div> */}

                {/* Product Disclaimer */}
                {/* <div className="form-group mb-3">
                    <label htmlFor="productDisclaimer" style={labelStyle}>Product Disclaimer (Max 1000 words)</label>
                    <textarea className="form-control" id="productDisclaimer" rows="10" style={inputStyle}></textarea>
                </div> */}

                {/* Product Photo */}
                <div className="form-group mb-3">
                    <label htmlFor="productPhoto" style={labelStyle}>Product Photo (only in JPEG, JPG, PNG)</label>
                    <input type="file" name='image' className="form-control" id="productPhoto" accept=".jpeg, .jpg, .png" style={inputStyle} onChange={(e) => { setgetFile(e.target.files[0]) }} />
                </div>

                {/* Amount */}
                <div className="form-group mb-3">
                    <label htmlFor="amount" style={labelStyle}>Amount in Rs</label>
                    <input type="text" name='price' className="form-control" id="amount" placeholder="₹" style={inputStyle} onChange={(e) => getValue(e)} />
                </div>

                {/* Submit Button */}
                <button className="btn btn-dark w-50 text-white text-center" style={{ backgroundColor: '#501924', borderRadius: '5px', marginTop: '10%', width: '50%' }} onClick={(e) => { onSubmit(e) }}>
                    Add Product
                </button>
            {/* </form> */}
        </div>
    );
}

export default AddProduct;
