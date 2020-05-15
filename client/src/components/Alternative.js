import React, { Component } from "react";

class Alternatives extends Component {
  state = {};

  render() {
    return (
      <div>
        <img src={this.props.icon} />
        <a>{this.props.cat}</a>
      </div>
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
