import React, { Component } from "react";
//icons contains map of key-value pairs, where key are consts names and values are imgs
//you can specify file's name, if not defualt take from index.js
//you can import all/* or individual consts
import * as icons from "../images";
//ref https://github.com/maxmarinich/react-alice-carousel
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
    600: { items: 8 },
  }

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
        duration="600"
        fadeOutAnimation={true}
        mouseTrackingEnabled={true}
        swipeDisabled={false}
        touchTrackingEnabled={true}
        infinite={false}
        //disbale prev&next btns
        buttonsDisabled={true}
      />
    </section>;
  }
}

export default Categories;
