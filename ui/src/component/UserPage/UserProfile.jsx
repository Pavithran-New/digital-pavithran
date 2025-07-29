import React, { useEffect, useState } from 'react';
import { Header } from '../../component/header_footer/header';
import user from '../../images/user.png';
import { Backend_url } from '../../constant';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState("Meghana Lakshmi");
    const [gender, setGender] = useState("Female");
    // const [email, setEmail] = useState("Meghana123@gmail.com");
    const [contactNumber, setContactNumber] = useState("+91 9774852347");
    const [address, setAddress] = useState("No.5/11, 1st cross street, AP Road, Vijaywada, Andhra Pradesh, Pincode- 501106");
    const [password, setPassword] = useState("Craftcraze&4123");
    const [showPassword, setShowPassword] = useState(false);
    const [profileData, setProfileData] = useState({})
    const { email } = JSON.parse(localStorage.getItem("user"))

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    useEffect(() => {
        getData()

    }, [email])
    const getData = () => {
        const data = axios.get(`${Backend_url}/api/auth/getuser/${email}`).then((res) => setProfileData(res.data))
    }
    const handleEditClick = () => setIsEditing(true);

    const handleSaveClick = () => {
        axios.put(`${Backend_url}/api/auth/user/${profileData._id}`, profileData)
        setIsEditing(false);
        // Save changes to server or perform other actions here
    };
const navigate = useNavigate();
    return (
        <div className="container py-3">
            <Header label="Track Order" />

            <div className="p-4 rounded border border-secondary mt-5">
                <img
                    src={user}
                    alt="User Profile"
                    className="mb-4"
                    style={{
                        width: '50%',
                        display: 'block',
                        marginLeft: 'auto',
                        marginRight: 'auto'
                    }}
                />
                {isEditing ? (
                    <div>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                name='username'
                                value={profileData.username}
                                onChange={(e) => setProfileData({ ...profileData, [e.target.name]: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Gender:</label>
                            <input
                                type="text"
                                className="form-control"
                                name='gender'
                                value={profileData.gender}
                                onChange={(e) => setProfileData({ ...profileData, [e.target.name]: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-bold">E-mail:</label>
                            <input
                                type="email"
                                className="form-control"
                                name='email'
                                value={profileData.email}
                                onChange={(e) => setProfileData({ ...profileData, [e.target.name]: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Contact Number:</label>
                            <input
                                type="text"
                                className="form-control"
                                name='contactNo'
                                value={profileData.contactNo}
                                onChange={(e) => setProfileData({ ...profileData, [e.target.name]: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Address:</label>
                            <textarea
                                className="form-control"
                                name='address'
                                value={profileData.address}
                                onChange={(e) => setProfileData({ ...profileData, [e.target.name]: e.target.value })}
                                style={{ height: '100px' }}
                            />
                        </div>
                        {/* <div className="mb-3">
                            <label className="form-label fw-bold">Password:</label>
                            <div className="input-group">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control"
                                    value={profileData.password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div> */}
                        <button
                            className="btn text-white w-100 mt-4"
                            style={{ backgroundColor: '#501924', borderRadius: '5px' }}
                            onClick={handleSaveClick}
                        >
                            UPDATE PROFILE
                        </button>
                    </div>
                ) : (
                    <div>
                        <p className="d-flex justify-content-between align-items-center mb-4">
                            <span className="fw-bold me-2">Name:</span>
                            <span>{profileData.username}</span>
                        </p>
                        <p className="d-flex justify-content-between align-items-center mb-4">
                            <span className="fw-bold me-2">Gender:</span>
                            <span>{profileData.gender}</span>
                        </p>
                        <p className="d-flex justify-content-between align-items-center mb-4">
                            <span className="fw-bold me-2">E-mail:</span>
                            <span>{profileData.email}</span>
                        </p>
                        <p className="d-flex justify-content-between align-items-center mb-4">
                            <span className="fw-bold me-2">Contact Number:</span>
                            <span>{profileData.contactNo}</span>
                        </p>
                        <p className="d-flex justify-content-between align-items-center mb-4">
                            <span className="fw-bold me-2">Address:</span>
                            <span>{profileData.address}</span>
                        </p>
                        {/* <p className="d-flex justify-content-between align-items-center mb-4">
                            <span className="fw-bold me-2">Password:</span>
                            <span>{password.replace(/./g, '*')}</span>
                        </p> */}
                        <button
                            className="btn text-white w-100 mt-4"
                            style={{ backgroundColor: '#501924', borderRadius: '5px' }}
                            onClick={handleEditClick}
                        >
                            EDIT PROFILE
                        </button>
                    </div>
                )}
            </div>
            <button
                className="btn text-white w-100 mt-4"
                style={{ backgroundColor: '#501924', borderRadius: '5px' }}
                onClick={() => { localStorage.clear(); navigate('/') }}
            >
                Logout
            </button>
        </div>
    );
};

export default UserProfile;
