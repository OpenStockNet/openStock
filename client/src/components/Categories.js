import React, { Component } from "react";
//icons contains map of key-value pairs, where key are consts names and values are imgs
//you can specify file's name, if not defualt take from index.js
//you can import all/* or individual consts
import * as icons from "../images";

import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'

class Categories extends Component {
  handleCategory = (category) => {
    const newAppList = this.props.appsList.filter((app) => app.category._id === category);
    this.props.setApps(newAppList);
    this.props.setQuery("");
  };


  responsive = {
    //mobile
    0: { items: 4 },
    //desktop 
    1024: { items: 8 },
  }

  // onSlideChange(e) {
  //   console.debug('Item`s position during a change: ', e.item)
  //   console.debug('Slide`s position during a change: ', e.slide)
  // }

  // onSlideChanged(e) {
  //   console.debug('Item`s position after changes: ', e.item)
  //   console.debug('Slide`s position after changes: ', e.slide)
  // }


  render() {

    const appCategories = this.props.category.map((cat) => {
      return (
        <button key={cat._id} onClick={() => this.handleCategory(cat._id)} className="btnCategories">
          <img src={icons[cat.icon]} alt=""/>
          <p style={{ display: "inline-block" }}>{cat.name}</p>
        </button>
      );
    });

    return <section id="catContainer">
      {/* {appCategories} */}
      
      <AliceCarousel
        items={appCategories}
        responsive={this.responsive}
        controlsStrategy="responsive"
        fadeOutAnimation={true}
        mouseTrackingEnabled={true}
        onSlideChange={this.onSlideChange}
        onSlideChanged={this.onSlideChanged}
        //below are default...
        swipeDisabled={false}
        touchTrackingEnabled={true}

      />

    </section>;
  }
}

export default Categories;
