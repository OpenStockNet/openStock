import React, { useState, useEffect } from 'react';
import { fetchAllCategories } from '../services/category';
import { fetchAllApps } from '../services/app';

import Search from './Search';
import Categories from './Categories';
import List from './List';

import './HomePage.scss';

function HomePage() {
  const [categories, setCategories] = useState([]);
  const [appsList, setAppsList] = useState([]);
  const [appsFiltered, setAppsFiltered] = useState([]);
  const [queries, setQueries] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchAllCategories()
      .then((categories) => {
        setCategories(categories);
      })
      .catch((error) => {
        alert(error.message);
      });

    fetchAllApps()
      .then((apps) => {
        setAppsList(apps);
        setAppsFiltered(apps);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  const setQuery = (newQueries) => {
    setQueries(newQueries);
    setSearchTerm(newQueries);
  };

  const setApps = (newApps) => {
    setAppsFiltered(newApps);
  };

  return (
    <main className="">
      <h1>If you don't protect your privacy, who will?</h1>
      <h2>Find the right app to protect your privacy with OpenStock</h2>
      <Search setQuery={setQuery} queries={queries} />
      <Categories
        setApps={setApps}
        setQuery={setQuery}
        appsList={appsList}
        category={categories}
      />
      <List
        setApps={setApps}
        appsList={appsList}
        appsFiltered={appsFiltered}
        queries={queries}
      />
    </main>
  );
}

export default HomePage;
