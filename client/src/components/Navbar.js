import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../services/auth";

const Navbar = () => {
  //window.location redirects user back to homepage and reload the page
  const handleLogOut = () => {
    logout().then(() => {
      window.location = "/";
    });
  };

  return (
    <nav className="navbar">
      <div id="logoHome">
        <Link to="/">
          <img src="https://res.cloudinary.com/dt9v4wqeu/image/upload/v1590001345/openstock/logoOpenstock.svg" />
        </Link>
        {/* <Link to="/alternatives">Alternatives to</Link> */}
      </div>
      <div>
        <Link to="/apps/new">create an app</Link>
        <Link to="/login">Log in</Link>
        <Link to="/signup">Sign Up</Link>
        <button onClick={handleLogOut}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
