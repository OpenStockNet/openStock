import React, { Component } from "react";

class ProductDetail extends React.Component {
  render() {
    return <h2>{this.props.name}</h2>;
  }
}

ReactDOM.render(<ProductDetail name="Product name dummy" />);

export default Navbar;
