import React from 'react';
import './ToolsSection.css';
import icon1 from "./imgs/Group.svg";
import icon2 from "./imgs/Icon.svg";
import icon3 from "./imgs/Icon1.svg";

const ToolsSection = () => {
  const toolsData = [
    {
      id: 1,
      title: "QUALITY TOOLS",
      description: "Invest in high-quality knives, cutting boards, and cookware.",
      icon: icon1
    },
    {
      id: 2,
      title: "ESSENTIAL UTENSILS",
      description: "Have a variety of utensils, including spatulas, tongs, and ladles.",
      icon: icon2
    },
    {
      id: 3,
      title: "MEASURING ACCURACY",
      description: "Use measuring cups and spoons for precise ingredient quantities.",
      icon: icon3
    }
  ];

  return (
    <section className="tools-container  container">
      <div className="tools-wrapper">
        {toolsData.map((item) => (
          <div key={item.id} className="tool-card">
            <div className="tool-icon">

              <img src={item.icon} />
              
              {/* <span>{item.icon}</span> */}
            </div>
            <div className="tool-content">
              <h3 className="tool-title">{item.title}</h3>
              <p className="tool-description">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ToolsSection;