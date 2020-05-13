import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div>
        <a to="/">Home</a>
        <a to="/">Browse</a>
        <a to="/">Alternatives to</a>
      </div>
      <div>
        <a to="/">Login</a>
        <a to="/">SignUp</a>
      </div>
    </nav>
  );
};

export default Navbar;
