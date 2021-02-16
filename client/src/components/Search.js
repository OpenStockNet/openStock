import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { SearchIcon } from '../images';
import './Search.scss';

function Search({ onSearchTermsChange, searchTerms }) {
  const inputRef = useRef();

  const handleInputChange = (event) => {
    const keyWords = event.target.value;
    onSearchTermsChange(keyWords);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // not focus when submit; to make virtual keyboard on phone disappear
    inputRef.current.blur();
  };

  return (
    <form id="search" onSubmit={handleSubmit} role="search">
      <input
        placeholder="Search app by name"
        value={searchTerms}
        onChange={handleInputChange}
        ref={inputRef}
      />
      <div className="search-icon-container" onClick={handleSubmit} role="presentation">
        <img src={SearchIcon} alt="search-icon" />
      </div>
    </form>
  );
}

Search.propTypes = {
  onSearchTermsChange: PropTypes.func.isRequired,
  searchTerms: PropTypes.string.isRequired,
};

export default Search;
