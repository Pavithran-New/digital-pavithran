import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Backend_url } from "../constant";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${Backend_url}/api/auth/login`, {
        email,
        password,
      });

      const { token, role,username,users } = response.data;

      if (!role) {
        throw new Error("Role is missing in the response");
      }

      const user = { email, role,username ,_id: users._id};

      localStorage.setItem("user", JSON.stringify(user));
      if (token) {
        localStorage.setItem("token", token);
      }

      setUser(user);
      setRole(role);

      if (role === "admin") {
        navigate("/OrderProgressBar");
      } else {
        navigate("/customer");
      }
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const register = async (username, email, contactNo, role, password) => {
    try {
      const response = await axios.post(`${Backend_url}/api/auth/register`, {
        username,
        email,
        contactNo,
        role,
        password, 
      });
      // console.log('context', response.data)
      // const { user } = response.data;

      // localStorage.setItem("user", JSON.stringify(user));
      // setUser(user);
      // setRole(user.role);
      navigate("/login");
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${Backend_url}/api/auth/logout`);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
      setRole(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, role, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
