import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { toast } from 'react-toastify';
import authService from "../../services/authService";
import loginImg from "../Login/login.png"; 
import '../Login/loginstyle.css';

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      authService.register(formData);
      toast.success('Account created successfully!');
      navigate('/login');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <main className="login-page">
      <motion.div className="login-container" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
        <div className="login-image">
          <img src={loginImg} alt="cooking" />
        </div>
        <div className="login-form-wrapper">
          <div className="login-form">
            <h2>SIGN UP</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>FIRST NAME</label>
                <input type="text" name="firstName" onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label>LAST NAME</label>
                <input type="text" name="lastName" onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label>EMAIL ADDRESS</label>
                <input type="email" name="email" onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label>PASSWORD</label>
                <input type="password" name="password" onChange={handleChange} required />
              </div>
              <button type="submit" className="login-btn">CREATE ACCOUNT</button>
            </form>
            <div className="footer-text">
              <span className="footer-label">ALREADY HAVE AN ACCOUNT?</span>
              <Link to="/login" className="register-link">LOG IN NOW</Link>
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}