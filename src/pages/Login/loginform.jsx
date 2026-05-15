import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import authService from '../../services/authService';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.login(email, password);
      toast.success('Welcome back to Cooks Delight!');

      setTimeout(() => {
        navigate('/');
      }, 1500);

    } catch (err) {
      toast.error(err.message || 'Invalid email or password');
    }
  };

  return (
    <div className="login-form">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        LOG IN
      </motion.h2>

      <p className="welcome-text">
        Welcome back to your kitchen. Log in to access your saved recipes, favorite dishes, and personal cooking space.      </p>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>EMAIL ADDRESS</label>
          <input
            type="email"
            placeholder="yourname@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>PASSWORD</label>
          <input
            type="password"
            placeholder=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-btn">
          SIGN IN NOW!
        </button>
      </form>

      <div className="footer-text">
        <span className="footer-label">DON'T HAVE AN ACCOUNT?</span>
        <Link to="/register" className="register-link">CREATE ONE NOW</Link>
      </div>
    </div>
  );
};

export default LoginForm;