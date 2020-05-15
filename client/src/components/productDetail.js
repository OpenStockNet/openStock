import React, { Component } from "react";
import ReactDOM from "react-dom";

class ProductDetail extends Component {
  state = {};

  render() {
    const detail = this.props.alternatives.map((alternative) => {
      return (
        <div>
          <h2>{this.props.name}</h2>
          <h3>Description</h3>
          <p>{this.props.description}</p>
        </div>
      );
    });
    return <div>{alternatives}</div>;
  }
}

export default ProductDetail;
