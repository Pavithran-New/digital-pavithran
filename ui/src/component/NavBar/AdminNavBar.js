import Container from 'react-bootstrap/Container';
import React, { useState } from "react";
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../provider/AuthProvider";

function ContainerInsideExample() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [error, setError] =useState("");
    const handleLogout = async () => {
        try {
          
          await logout();
    
         
          navigate("/login");
        } catch (error) {
          console.error("Logout failed:", error);
          setError("Logout failed. Please try again.");
        }
      };
  return (
    <Navbar expand="lg" className="bg-body-tertiary" sticky="top" style={{ borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px' }}>
      <Container>
        <Navbar.Brand href="#">Navbar</Navbar.Brand>
        <div style={{ marginTop: '8px', textAlign: 'center' }} className='d-flex flex-column'>
          <span style={{ color: 'green' }}>
            Unleash Your Inner Artisan
          </span>
          <button
                onClick={handleLogout}
                style={{
                  border: "2px solid black",
                  borderRadius: "8px 8px",
                  fontSize: "25px",
                  backgroundColor: "#501924",
                  color: "white",
                  fontFamily: "serif",
                }}
                name="logout"
              >
                <span style={{ padding: "10px 40px 10px 40px" }}>Logout</span>
              </button>
        </div>
      </Container>
    </Navbar>
  );
}

export default ContainerInsideExample;
