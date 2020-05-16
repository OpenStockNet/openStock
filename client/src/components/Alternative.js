import React, { Component } from "react";
import { Link } from "react-router-dom";

class Alternatives extends Component {
  state = {};

  render() {
    return (
      <Link>
        <img src={this.props.icon} />
        <p style={{ display: "inline-block" }}>{this.props.cat}</p>
      </Link>
    );
  }
}

/* function Categories(props) {
  return (
    <div>
      <h2>Name of the category {this.props.name}</h2>
    </div>
  );
} */
export default Alternatives;
