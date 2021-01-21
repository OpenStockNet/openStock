import React, { useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
// icons contains map of key-value/name-image pairs in index.js
import * as icons from '../images';
import 'react-alice-carousel/lib/alice-carousel.css'; // ref https://github.com/maxmarinich/react-alice-carousel
import { ALL_CATEGORIES } from '../constants';
import PropTypes from 'prop-types';

import './Categories.scss';

function Categories({ categories, selectedCategory, onCategoryChange }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleCategory = (categoryId) => {
    onCategoryChange(categoryId);
  };

  const handleSlideChange = (event) => {
    setActiveIndex(event.item);
  };

  const responsive = {
    // mobile
    0: { items: 2 },
    324: { items: 3 },
    // desktop
    600: { items: 9 },
  };

  const allCategories = (
    <button
      data-testid="filter-button"
      key={ALL_CATEGORIES}
      onClick={() => handleCategory(ALL_CATEGORIES)}
      className={selectedCategory === ALL_CATEGORIES ? 'btnCategories selected' : 'btnCategories'}
    >
      <img src={icons.AllAppsIcon} alt="" />
      <p>All</p>
    </button>
  );

  const appCategories = categories
    .map((cat) => (
      <button
        data-testid="filter-button"
        key={cat._id}
        onClick={() => handleCategory(cat._id)}
        className={selectedCategory === cat._id ? 'btnCategories selected' : 'btnCategories'}
      >
        <img src={icons[cat.icon]} alt="" />
        <p className="highlight">{cat.name}</p>
      </button>
    ));

  appCategories.unshift(allCategories);

  return (
    <section id="catContainer">
      {/* {appCategories} */}
      <AliceCarousel
        items={appCategories}
        responsive={responsive}
        controlsStrategy="responsive"
        duration={250}
        fadeOutAnimation
        mouseTrackingEnabled
        infinite={false}
        // disbale prev&next btns
        disableButtonsControls
        activeIndex={activeIndex}
        onSlideChanged={handleSlideChange}
      />
    </section>
  );
}

Categories.propTypes = {
  categories: PropTypes.array.isRequired,
  selectedCategory: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
};

export default Categories;
