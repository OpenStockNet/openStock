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
    0: { items: 2 },
    324: { items: 3 },
    // desktop
    600: { items: 9 },
  };

  const ALLCAT = 'allCat';

  const allCat = (
    <button
        data-testid="filter-button"
        key={ALLCAT}
        onClick={() => handleCategory(ALLCAT)}
        className={props.selectedCategory === ALLCAT ? 'btnCategories selected' : 'btnCategories'}
      >
        <img src={icons.AllAppsIcon} alt="" />
        <p style={{ display: 'inline-block' }}>All</p>
      </button>
  )

  const appCategories = 
      props.categories
        .map((cat) => (
          <button
            data-testid="filter-button"
            key={cat._id}
            onClick={() => handleCategory(cat._id)}
            className={props.selectedCategory === cat._id ? 'btnCategories selected' : 'btnCategories'}
          >
            <img src={icons[cat.icon]} alt="" />
            <p style={{ display: 'inline-block' }}>{cat.name}</p>
          </button>
        ));
  
  appCategories.unshift(allCat);
      
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
