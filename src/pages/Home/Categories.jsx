import React from 'react';
import './Home.css';

import breakfastIcon from '../../assets/icons/breakfast.svg';
import lunchIcon from '../../assets/icons/lunch.svg';
import dinnerIcon from '../../assets/icons/dinner.svg';
import dessertIcon from '../../assets/icons/dessert.svg';
import quickBiteIcon from '../../assets/icons/quick.svg';
import Button from '../../components/common/button/Button';

const Categories = () => {
  const categoriesList = [
    { id: 1, name: 'breakfast', icon: breakfastIcon },
    { id: 2, name: 'lunch', icon: lunchIcon },
    { id: 3, name: 'dinner', icon: dinnerIcon },
    { id: 4, name: 'dessert', icon: dessertIcon },
    { id: 5, name: 'quick bite!', icon: quickBiteIcon },
  ];

  return (
    <section className="categories-section">
      <div className="container">
        <div className="categories-card">

          <div className="categories-info">
            <span className="explore-badge">explore</span>
            <h2 className="section-title">our diverse palette</h2>
            <p className="section-desc">
              If you are a breakfast enthusiast, a connoisseur of savory delights, or
              on the lookout for irresistible desserts, our curated selection has
              something to satisfy every palate.
            </p>
            <Button children="see more " className="btn-see-more" />
          </div>

          <div className="categories-list">
            {categoriesList.map((item) => (
              <div key={item.id} className="category-item">

                <div className="category-icon">
                  <img src={item.icon} alt={item.name} />
                </div>

                <span className="category-name">{item.name}</span>

              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Categories;