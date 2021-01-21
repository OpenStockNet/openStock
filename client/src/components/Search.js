import React from 'react';
import PropTypes from 'prop-types';
import { SearchIcon } from '../images';
import './Search.scss';

function Search({ onQueryChange, queries }) {
  const handleInputChange = (event) => {
    const keyWords = event.target.value;
    onQueryChange(keyWords);
  };

  return (
    <form id="search">
      <input
        placeholder="Search app by name"
        value={queries}
        onChange={handleInputChange}
      />
      <div className="search-icon-container">
        <img src={SearchIcon} alt="search-icon" />
      </div>
    </form>
  );
}

Search.propTypes = {
  onQueryChange: PropTypes.func.isRequired,
  queries: PropTypes.string.isRequired,
};

export default Search;
