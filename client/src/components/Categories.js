import React, { Component } from 'react';
// icons contains map of key-value pairs: consts names - images in index.js
// you can import all/* or individual consts with {file name}
import AliceCarousel from 'react-alice-carousel';
import * as icons from '../images';
// ref https://github.com/maxmarinich/react-alice-carousel
import 'react-alice-carousel/lib/alice-carousel.css';

import './Categories.scss';

function Categories(props) {
  const handleCategory = (categoryId) => {
    props.onCategoryChange(categoryId);
  };

  const responsive = {
    // mobile
    0: { items: 4 },
    // desktop
    600: { items: 8 },
  };

  const appCategories = props.categories.map((cat) => (
    <button
      data-testid="filter-button"
      key={cat._id}
      onClick={() => handleCategory(cat._id)}
      className="btnCategories"
    >
      <img src={icons[cat.icon]} alt="" />
      <p style={{ display: 'inline-block' }}>{cat.name}</p>
    </button>
  ));

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
        swipeDisabled={false}
        touchTrackingEnabled
        infinite={false}
        // disbale prev&next btns
        buttonsDisabled
      />
    </section>
  );
}

export default Categories;
