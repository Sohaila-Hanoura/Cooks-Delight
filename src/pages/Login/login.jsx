import React from "react";
import LoginForm from "./loginForm";
import './loginstyle.css';
import loginImg from "./login.png";
import { motion } from "framer-motion";

export default function Login() {
  return (
    <main className="login-page">
      <motion.div 
        className="login-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="login-image"
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <img src={loginImg} alt="cooking" />
        </motion.div>

        <motion.div
          className="login-form-wrapper"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <LoginForm />
        </motion.div>
      </motion.div>
    </main>
  );
}