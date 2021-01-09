import React from 'react';
import { SearchIcon } from '../images';
import './Search.scss';

function Search(props) {
  const handleInputChange = (event) => {
    const keyWords = event.target.value;
    props.setQuery(keyWords);
  };

  return (
    <form id="search">
      <input
        placeholder="Search an app by name"
        value={props.queries}
        onChange={handleInputChange}
      />
      <div className="search-icon-container">
        <img src={SearchIcon} alt="search-icon" />
      </div>
    </form>
  );
}

export default Search;
