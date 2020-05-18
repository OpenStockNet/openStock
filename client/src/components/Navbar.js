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
      <div>
        <Link to="/">Home</Link>
        {/* <Link to="/alternatives">Alternatives to</Link> */}
      </div>
      <div>
        <Link to="/login">Login</Link>
        <Link to="/signup">SignUp</Link>
        <button onClick={handleLogOut}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
