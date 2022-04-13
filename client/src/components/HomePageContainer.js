import React, { useState, useEffect } from 'react';
import { fetchAllCategories } from '../services/category';
import { fetchAllApps } from '../services/app';

import Search from './Search';
import Categories from './Categories';
import AppsList from './AppsList.tsx';
import Loader from './Loader';
import NotFoundPage from './NotFoundPage';

import { ALL_CATEGORIES } from '../constants';
import './HomePageContainer.scss';

function HomePageContainer() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORIES);
  const [appsList, setAppsList] = useState([]);
  const [searchTerms, setSearchTerms] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    fetchAllCategories()
      .then((allCategories) => {
        setCategories(allCategories);
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });

    fetchAllApps()
      .then((apps) => {
        setAppsList(apps);
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
  }, []);

  const handleSearchTerms = (newQueries) => {
    setSearchTerms(newQueries);
    setSelectedCategory(ALL_CATEGORIES);
  };

  const handleCategory = (categoryId) => {
    setSearchTerms('');
    setSelectedCategory(categoryId);
  };

  // category and search are independent from each other
  function filterApps() {
    if (selectedCategory === ALL_CATEGORIES) {
      return appsList
        .filter((searchApp) => searchApp.name.toLowerCase().includes(searchTerms.toLowerCase()));
    }
    return appsList
      .filter((app) => app.category._id === selectedCategory);
  }

  if (errorMsg) return <NotFoundPage errorMsg={errorMsg} />;
  if (!categories.length || !appsList.length) return <Loader />;

  return (
    <main>
      <h1 className="highlight">If you don't protect your privacy, who will?</h1>
      <h2 className="highlight">Find the right app to protect your privacy with OpenStock</h2>
      <Search
        onSearchTermsChange={handleSearchTerms}
        searchTerms={searchTerms}
      />
      <Categories
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategory}
      />
      <AppsList
        appsFiltered={filterApps()}
        errorMsg="No apps found with the key word. Try something else."
      />
    </main>
  );
}

export default HomePageContainer;
