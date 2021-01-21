import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { SearchIcon } from '../images';
import './Search.scss';

function Search({ onQueryChange, queries }) {
  const inputRef = useRef();

  const handleInputChange = (event) => {
    const keyWords = event.target.value;
    onQueryChange(keyWords);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // not focus when submit; to make virtual keyboard on phone disappear
    inputRef.current.blur();
  };

  return (
    <form id="search" onSubmit={handleSubmit}>
      <input
        placeholder="Search app by name"
        value={queries}
        onChange={handleInputChange}
        ref={inputRef}
      />
      <div className="search-icon-container" onClick={handleSubmit}>
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
