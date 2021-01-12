import React, { useState, useEffect } from 'react';
import { fetchAllCategories } from '../services/category';
import { fetchAllApps } from '../services/app';

import Search from './Search';
import Categories from './Categories';
import List from './List';
import Loader from './Loader';

import './HomePageContainer.scss';

function HomePageContainer() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [appsList, setAppsList] = useState([]);
  const [queries, setQueries] = useState('');

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
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  const handleQuery = (newQueries) => {
    setQueries(newQueries);
    setSelectedCategory(null);
  };

  const handleCategory = (categoryId) => {
    setQueries('');
    setSelectedCategory(categoryId);
  };

  // category and search are independent from each other
  function filterApps() {
    if (selectedCategory) {
      return appsList
        .filter((app) => (selectedCategory ? app.category._id === selectedCategory : true));
    }
    return appsList
      .filter((searchApp) => searchApp.name.toLowerCase().includes(queries.toLowerCase()));
  }

  if (!categories.length || !appsList.length) return <Loader />;

  return (
    <main>
      <h1>If you don't protect your privacy, who will?</h1>
      <h2>Find the right app to protect your privacy with OpenStock</h2>
      <Search onQueryChange={handleQuery} queries={queries} />
      <Categories
        categories={categories}
        onCategoryChange={handleCategory}
      />
      <List
        appsFiltered={filterApps()}
      />
    </main>
  );
}

export default HomePageContainer;
