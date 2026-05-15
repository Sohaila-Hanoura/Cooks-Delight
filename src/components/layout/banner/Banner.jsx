import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Banner.css'
const Banner = () => {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/register'); 
  };

  return (
    <section className="news-banner">
      <div className="container">
        <motion.div 
          className="news-card"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="ellipse-1"></div>
          <div className="ellipse-2"></div>
          
          <div className="news-content">
            <motion.p 
              className="news-tag"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              sign up
            </motion.p>
            
            <motion.p 
              className="news-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              join the fun <br /> CREATE ACCOUNT now!
            </motion.p>
            
            <motion.p 
              className="news-text"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              Create an account to save your favorite recipes, share your own dishes, and enjoy a personalized cooking experience.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
            <button 
                className="news-btn" 
                onClick={handleSignUpClick}
              >
                sign up
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;