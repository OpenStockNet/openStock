import React, { Component } from "react";

class Categories extends Component {
  handleCategory = (category) => {
    const newAppList = this.props.appsList.filter((app) => app.category._id === category);
    this.props.setApps(newAppList);
    this.props.setQuery("");
  };

  render() {
    const appCategories = this.props.category.map((cat) => {
      return (
        <button key={cat._id} onClick={() => this.handleCategory(cat._id)} className="btnCategories">
          <img src={cat.icon} alt=""/>
          <p style={{ display: "inline-block" }}>{cat.name}</p>
        </button>
      );
    });
    return <section id="catContainer">{appCategories}</section>;
  }
}

export default Categories;
