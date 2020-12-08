import React, { useEffect, useState } from 'react';

import './Search.scss';
 
function Search(props) {
    // const [keys, setKeys] = useState();

    // const handleInputChange = (event) => {
    //   const keyWords = event.target.value;
    //   setKeys(keyWords)
    // }

    // const handleSubmit = (event) => {

    //   event.preventDefault();
    //   const keyWords = event.target.value;
    //    props.setQuery(keys);
    // }
    const handleInputChange = (event) => {
        const keyWords = event.target.value;
        props.setQuery(keyWords);
      }

    return(
      // <form id="search" onSubmit={handleSubmit} >
      <form id="search">
        <input
          placeholder='Search an app by name'
          value={props.query}
          // value={keys}
          onChange={handleInputChange}
        />
        {/* <button>find</button> */}
      </form>
    )
}

export default Search;
