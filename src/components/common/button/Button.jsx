import React from "react";
import "./Button.css";

const Button = ({ children, btnstyle = "primary", onClick }) => {
  return (
    <button className={`btn btn-${btnstyle}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;