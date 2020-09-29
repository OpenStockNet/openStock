import React, { Component } from 'react';

class Search extends Component {
  state = {
    query: '',
  };

  handleInputChange = (event) => {
    this.setState({
      query: event.target.value,
    });
  };

  componentDidUpdate(_, prevState) {
    if (prevState !== this.state) {
      this.props.setQuery(this.state.query);
    }
  }

  render() {
    return (
      <form id="search">
        <input
          placeholder="Search an app by name..."
          // ref={(input) => (this.search = input)}
          value={this.props.query}
          onChange={this.handleInputChange}
        />
      </form>
    );
  }
}

export default Search;
