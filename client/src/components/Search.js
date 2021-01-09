import React, { useEffect, useState } from 'react';
import IconMagnifier from '../images/searchMagnifier.svg'
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
      <div className='search-icon-container'>
        <img src={IconMagnifier} alt='search-icon'/>
      </div>
    </form>
  );
}

export default Search;
