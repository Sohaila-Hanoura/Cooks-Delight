import React from "react";
import { Link } from "react-router-dom";
import "./CulinarySection.css";
import Button from "../../components/common/button/Button";
import { galleryImages1 } from "../../data/aboutData";

const CulinarySection = () => {
  return (
    <section className="culinary-wrapper">
      <div className="container">
        <div className="culinary-card">
          <div className="culinary-layout">
            <div className="content-area">
              <span className="red-badge">About Us</span>
              <h2 className="culinary-title">OUR CULINARY <br /> CHRONICLE</h2>
              <p className="culinary-text">
                Our journey is crafted with dedication, creativity, and an unrelenting commitment to delivering delightful culinary experiences. Join us in savoring the essence of every dish and the stories that unfold.
              </p>
              <Link to="/about">
                <Button btnstyle="outline" className="read-more-btn btn">
                  READ MORE
                </Button>
              </Link>
            </div>

            <div className="img-top-middle">
              <img src={galleryImages1[1]?.src} alt={galleryImages1[8]?.alt} />
            </div>

            <div className="img-right-long">
              <img src={galleryImages1[2]?.src} alt={galleryImages1[10]?.alt} />
            </div>

            <div className="img-bottom-left">
              <img src={galleryImages1[0]?.src} alt={galleryImages1[9]?.alt} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CulinarySection;