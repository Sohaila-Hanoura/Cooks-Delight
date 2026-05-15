import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { motion } from "framer-motion";
import Author from "../../assets/images/Author Image.png";

export default function ChefBio() {
  return (
    <div className="chef-container">
      <motion.div 
        className="chef-image-wrapper cropped-image"
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <img src={Author} alt="Chef Isabella Russo" className="main-chef-img" />
        
        <div className="follow-bar">
          <span className="follow-text">Follow me</span>
          <div className="social-icons">
            <a href="#" className="social-link"><FaFacebookF /></a>
            <a href="#" className="social-link"><FaInstagram /></a>
            <a href="#" className="social-link"><FaYoutube /></a>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="chef-bio-content"
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="chef-title">FROM ITALIAN ROOTS TO GLOBAL PALATES</h2>
        <div className="chef-description">
          <p>Born and raised in the vibrant culinary landscape of Italy, my journey with food began in the heart of my family's kitchen. Surrounded by the aroma of fresh herbs, the sizzle of pans, and the laughter of loved ones, I developed a deep appreciation for the art of cooking. My culinary education took me from the historic streets of Rome to the bustling markets of Florence, where I honed my skills and cultivated a love for the simplicity and authenticity of Italian cuisine.</p>
          <p>Driven by a relentless curiosity, I embarked on a global culinary exploration, seeking inspiration from the rich tapestry of flavors found in kitchens around the world. From the spicy markets of Marrakech to the sushi stalls of Tokyo, each experience added a unique brushstroke to my culinary canvas.</p>
          <p>Whether you're a seasoned home cook or just starting your culinary adventure, I'm delighted to have you here. Let's stir, simmer, and savor the beauty of creating something wonderful together.</p>
        </div>

        <div className="signature-wrapper">
          <p className="regards">Warmest regards,</p>
          <p className="signature">Isabella Russo</p>
        </div>
      </motion.div>
    </div>
  );
}