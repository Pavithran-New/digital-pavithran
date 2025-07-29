import React, { useState } from "react";
import image2 from "../../images/craft_craze_logo.jpg";
import { useAuth } from "../../provider/AuthProvider";

export const RegisterPage = () => {
  const { register } = useAuth();
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    contactNo: "",
    role: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
 const currentUser = JSON.parse(localStorage.getItem("user"));
  const role = currentUser ? currentUser.role : null;
  const valueChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (inputs.password !== inputs.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await register(inputs.username, inputs.email, inputs.contactNo, inputs.role, inputs.password);
    } catch (error) {
      console.error("Registration failed:", error);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100 mb-4">
      <div className="col-12 col-md-8 col-lg-6">
        {/* Logo Section */}
        <div className="text-center">
          <img
            src={image2}
            alt="logo"
            className="img-fluid mb-3"
            style={{ width: "50%", height: "auto" }}
          />
        </div>

        {/* Register Form */}
        <div className="card shadow-sm text-white p-4" style={{ backgroundColor: "#925E69" }}>
          <h5 className="text-center font-weight-bold mb-3">REGISTER</h5>

          {error && <span className="text-danger mb-3 d-block">{error}</span>}

          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label className="font-weight-bold">Name</label>
              <input
                type="text"
                name="username"
                className="form-control"
                placeholder="Enter your name"
                value={inputs.username}
                onChange={valueChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="font-weight-bold">E-mail</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter your email"
                value={inputs.email}
                onChange={valueChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="font-weight-bold">Contact No</label>
              <input
                type="text"
                name="contactNo"
                className="form-control"
                placeholder="Enter your contact no"
                value={inputs.contactNo}
                onChange={valueChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="font-weight-bold">Role</label>
              <select
                className="form-control"
                name="role"
                value={inputs.role}
                onChange={valueChange}
                required
              >
                <option value="">Select Role</option>
                <option value="user">User</option>
                {role && role==='admin'?<option value="admin">Admin</option>:null}
              </select>
            </div>

            <div className="form-group">
              <label className="font-weight-bold">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter your password"
                value={inputs.password}
                onChange={valueChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="font-weight-bold">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="form-control"
                placeholder="Confirm your password"
                value={inputs.confirmPassword}
                onChange={valueChange}
                required
              />
            </div>

            {/* Register Button */}
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-dark text-white w-50 mt-4"
                style={{ backgroundColor: "#501924", borderRadius: "5px" }}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
