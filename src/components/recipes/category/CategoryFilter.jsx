import React from "react";
import "./CategoryFilter.css";

const categories = ["All", "Breakfast", "Lunch", "Dinner", "Dessert", "Snack", "Side Dish"];

const CategoryFilter = ({ activeCategory, onCategoryChange }) => {
  return (
    <div className="category-filter-container">
      <div className="category-list">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-btn ${activeCategory === cat ? "active" : ""}`}
            onClick={() => onCategoryChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;