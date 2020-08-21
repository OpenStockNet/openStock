import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../services/auth";

const Navbar = (props) => {
  //window.location redirects user back to homepage and reload the page
  const handleLogOut = () => {
    logout()
      .then(() => {
        window.location = "/";
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const loggedInContent = (
    <div className="loggedUser">
      <p>
        Hello <b>{props.user.username}</b>
      </p>
      <Link to="/apps/new">
        <span>＋</span> Add new app
      </Link>
      <Link to={`/apps/wishlist/${props.user._id}`}>
        My wish list
      </Link>
      <button onClick={handleLogOut}>Log out</button>
    </div>
  );

  const loggedOutContent = (
    <div>
      <Link to="/login" className="aButton">
        Log in
      </Link>
      <Link to="/signup" className="aButton">
        Sign up
      </Link>
    </div>
  );

  return (
    <nav className="navbar">
      <div id="logoHome">
        <Link to="/">
          <img src="https://res.cloudinary.com/dt9v4wqeu/image/upload/v1590001345/openstock/logoOpenstock.svg" alt=""/>
        </Link>
        {/* <Link to="/alternatives">Alternatives to</Link> */}
      </div>
      {props.user ? loggedInContent : loggedOutContent}
    </nav>
  );
};

export default Navbar;
