import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Home.css';
import Button from '../../components/common/button/Button';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      <div className="container">
        <motion.div 
          className="hero-card"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero-overlay">
            <div className="hero-content">
              <motion.h1 
                className="hero-title"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                unleash culinary excellence
              </motion.h1>

              <motion.p 
                className="hero-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                Explore a world of flavors, discover handcrafted recipes, 
                and let the aroma of our passion for cooking fill your kitchen
              </motion.p>

              <motion.div 
                className="hero-buttons"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}
              >
                <Button 
                  children="sign up now!"  
                  btnstyle="sign" 
                  onClick={() => navigate('/login')} 
                />
                <Button 
                  children="explore recipes" 
                  btnstyle="explore" 
                  onClick={() => navigate('/recipes')} 
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;