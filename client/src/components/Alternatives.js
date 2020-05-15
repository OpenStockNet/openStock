import React, { Component } from "react";
import Alternative from "./Alternative";

class Alternatives extends Component {
  state = {
    user: this.props.user,
  };

  //user parameter comes from handleSUbmit() where I call the function
  setUser = (user) => {
    this.setState({
      user: user,
    });
  };

  render() {
    return (
      <div className="catNav">
        <Alternative cat="Chrome" icon="https://via.placeholder.com/40" />
        <Alternative cat="Google" icon="https://via.placeholder.com/40" />
        <Alternative cat="WhatsApp" icon="https://via.placeholder.com/40" />
        <Alternative cat="Gmail" icon="https://via.placeholder.com/40" />
        <Alternative cat="Netflix" icon="https://via.placeholder.com/40" />
        <Alternative cat="Google Maps" icon="https://via.placeholder.com/40" />
      </div>
    );
  }
}

export default Alternatives;
