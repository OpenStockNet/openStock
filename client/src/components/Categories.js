import React from 'react';
import AliceCarousel from 'react-alice-carousel';
// icons contains map of key-value pairs: consts names - images in index.js
import * as icons from '../images';
import 'react-alice-carousel/lib/alice-carousel.css'; // ref https://github.com/maxmarinich/react-alice-carousel
import { ALL_CATEGORIES } from '../constants';

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

  const allCategories = (
    <button
      data-testid="filter-button"
      key={ALL_CATEGORIES}
      onClick={() => handleCategory(ALL_CATEGORIES)}
      className={props.selectedCategory === ALL_CATEGORIES ? 'btnCategories selected' : 'btnCategories'}
    >
      <img src={icons.AllAppsIcon} alt="" />
      <p style={{ display: 'inline-block' }}>All</p>
    </button>
  );

  const appCategories = props.categories
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
