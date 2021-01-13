import React, { useState, useEffect } from 'react';
import { fetchAllCategories } from '../services/category';
import { fetchAllApps } from '../services/app';

import Search from './Search';
import Categories from './Categories';
import AppsList from './AppsList';
import Loader from './Loader';

import './HomePageContainer.scss';

const ALLCAT = 'allCat';

function HomePageContainer() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(ALLCAT);
  const [appsList, setAppsList] = useState([]);
  const [queries, setQueries] = useState('');

  useEffect(() => {
    fetchAllCategories()
      .then((allCategories) => {
        setCategories(allCategories);
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
    setSelectedCategory(ALLCAT);
  };

  const handleCategory = (categoryId) => {
    setQueries('');
    setSelectedCategory(categoryId);
  };

  // category and search are independent from each other
  function filterApps() {
    if (selectedCategory === ALLCAT) {
      return appsList
        .filter((searchApp) => searchApp.name.toLowerCase().includes(queries.toLowerCase()));
    } else {
      return appsList
        .filter((app) => app.category._id === selectedCategory);
    }
  }

  if (!categories.length || !appsList.length) return <Loader />;

  return (
    <main>
      <h1>If you don't protect your privacy, who will?</h1>
      <h2>Find the right app to protect your privacy with OpenStock</h2>
      <Search
        onQueryChange={handleQuery}
        queries={queries}
      />
      <Categories
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategory}
      />
      <AppsList
        appsFiltered={filterApps()}
        text={'Sorry, we haven\'t found any alternative app 😧. Try something different.'}
      />
    </main>
  );
}

export default HomePageContainer;
