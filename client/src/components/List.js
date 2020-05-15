import React, { Component } from "react";

class List extends Component {
  state = {};

  render() {
    const alternatives = this.props.alternatives.map((alternative) => {
      return (
        <div key={alternative._id}>
          <h2>{alternative.name}</h2>
          <p>{alternative.category}</p>
        </div>
      );
    });
    return <div>{alternatives}</div>;
  }
}

export default List;
