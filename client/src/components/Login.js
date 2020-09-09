import React, { Component } from "react";
import { Link } from "react-router-dom";
import { login } from "../services/auth";

class Login extends Component {
  state = {
    username: "",
    password: "",
  };

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { username, password } = this.state;

    login(username, password)
      .then((user) => {
        //successfully logged in
        this.props.setUser(user);
        //redirect to the page '/'
        this.props.history.push("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  render() {
    return (
      <main>
        <form onSubmit={this.handleSubmit} id="login">
          <h2>Log in</h2>
          <label htmlFor="username">User name </label>
          <input
            type="text"
            name="username"
            id="username"
            value={this.state.username}
            onChange={this.handleChange}
            placeholder="Type username here"
            autoFocus="true"
          />
          <label htmlFor="password">Password </label>
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            id="password"
            placeholder="Type password here"
          />
          <button type="submit">Log in</button>
          
          <section className="reminder">
            <p>Don't have an account? &nbsp;</p> 
            <Link to="/signup" id="underline_text">
             Sign up
            </Link>
          </section>
        </form>
        
      </main>
    );
  }
}

export default Login;
