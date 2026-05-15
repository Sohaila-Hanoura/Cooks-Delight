import React from 'react';
import './Loader.css';

const Loader = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="loader-overlay">
      <div className="loader-container">
        <div className="ring-outer"></div>
        <div className="ring-inner"></div>
        <div className="loader-text">
          Cooks <span>Delight</span>
        </div>
      </div>
    </div>
  );
};

export default Loader;