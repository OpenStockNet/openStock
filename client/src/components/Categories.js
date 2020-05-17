import dummyCategories from "./dummyCategories.json";

import React, { Component } from "react";
import { Link } from "react-router-dom";

class Categories extends Component {
  render() {
    const appCategories = dummyCategories.map((cat) => {
      return (
        <Link key={cat._id}>
          <img src={cat.icon} />
          <p style={{ display: "inline-block" }}>{cat.name}</p>
        </Link>
      );
    });
    return <div>{appCategories}</div>;
  }
}

export default Categories;
