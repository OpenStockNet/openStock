import React, { Component } from "react";

class Categories extends Component {
  handleCategory = (category) => {
    const newAppList = this.props.appsList.filter((app) => app.category === category);
    this.props.setApps(newAppList);
  };

  render() {
    const appCategories = this.props.category.map((cat) => {
      return (
        <button key={cat._id} onClick={() => this.handleCategory(cat.name)}>
          <img src={cat.icon} />
          <p style={{ display: "inline-block" }}>{cat.name}</p>
        </button>
      );
    });
    return <div>{appCategories}</div>;
  }
}

export default Categories;
