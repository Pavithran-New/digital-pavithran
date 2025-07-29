import React, { useState } from "react";
import image2 from "../../images/craft_craze_logo.jpg";
import { Link } from "react-router-dom";
import { useAuth } from "../../provider/AuthProvider";

export const LoginPage = () => {
  const { login } = useAuth();
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const valueChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs.email, inputs.password);
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100 mb-4">
      <div className="col-12 col-md-8 col-lg-6">
        {/* Logo Section */}
        <div className="text-center">
          <img src={image2} alt="logo" className="img-fluid mb-3" style={{ width: "50%" }} />
        </div>

        {/* Login Form */}
        <div className="card shadow p-4" style={{ backgroundColor: "#925E69", borderRadius: "10px" }}>
          <h5 className="text-center font-weight-bold text-white mb-4">LOGIN</h5>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="text-white font-weight-bold">Email</label>
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
              <label className="text-white font-weight-bold">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter your password"
                autoComplete="off"
                value={inputs.password}
                onChange={valueChange}
                required
              />
            </div>

            {/* Login Button */}
            <div className="text-center mt-4">
              <button
                type="submit"
                className="btn text-white w-50"
                style={{ backgroundColor: "#501924", borderRadius: "8px" }}
              >
                Login
              </button>
            </div>
          </form>

          {/* Register Link */}
          <div className="text-center mt-3">
            <p className="text-white">
              Don't have an account?{" "}
              <Link to="/register" className="text-warning font-weight-bold">
                Register here!
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
