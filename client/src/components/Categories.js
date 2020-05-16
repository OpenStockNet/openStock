import React, { Component } from "react";
import Category from "./Category";

class Categories extends Component {
  render() {
    return (
      <div className="catNav">
        <Category cat="Browser" icon="https://via.placeholder.com/40" />
        <Category cat="Search Engine" icon="https://via.placeholder.com/40" />
        <Category cat="Messenger" icon="https://via.placeholder.com/40" />
        <Category cat="E-mail Provider" icon="https://via.placeholder.com/40" />
        <Category cat="Online Streaming" icon="https://via.placeholder.com/40" />
        <Category cat="Map Navigation" icon="https://via.placeholder.com/40" />
      </div>
    );
  }
}

export default Categories;
