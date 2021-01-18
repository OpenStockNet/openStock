import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createApp } from '../services/app';
import { fetchAllCategories } from '../services/category';
import Loader from './Loader';

import SharedSnackbarContext from './SharedSnackbar.context';
import SharedDialogContext from './SharedDialog.context';

import './NewApp.scss';

function NewAppContainer({ user, history }) {
  const [name, setName] = useState('');
  const [website, setWebsite] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [device, setDevice] = useState([]);
  const [logo, setLogo] = useState('');

  const { openSnackbar } = useContext(SharedSnackbarContext);
  const { openDialog } = useContext(SharedDialogContext);

  useEffect(() => {
    fetchAllCategories()
      .then((allCategories) => {
        setCategory(allCategories[0]._id);
        setCategories(allCategories);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleWebsiteChange(event) {
    setWebsite(event.target.value);
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  function handleLogoChange(event) {
    setLogo(event.target.value);
  }

  function handleCategoryChange(event) {
    setCategory(event.target.value);
  }

  function handleCheckbox(event) {
    const { id, checked } = event.target;
    // const deviceCopy = device.map((selectedDevice) => selectedDevice);
    const deviceCopy = [...device];

    if (checked) {
      deviceCopy.push(id);
    } else {
      const index = deviceCopy.indexOf(id);
      if (index > -1) {
        deviceCopy.splice(index, 1);
      }
    }
    setDevice(deviceCopy);
  }

  // can also be nested in ensureLogin as in EditApp
  function handleSubmit(event) {
    event.preventDefault();
    const creator = user._id;

    if (user) {
      createApp(name, description, category, device, website, logo, creator)
        .then((app) => {
          history.push(`/apps/${app._id}`);
          openSnackbar(`${app.name} is published. Thanks for your contribution!`);
        })
        .catch((error) => {
          alert(error.message);
        });
    } else (openDialog('Log in to continue.'));
  }

  if (!categories) return <Loader />;
  const categoryOptions = categories.map((selectedCategory) => (
    <option
      key={selectedCategory._id}
      value={selectedCategory._id}
    >
      {selectedCategory.name}
    </option>
  ));

  return (
    <main>
      <div className="return-container">
        <Link to="/" className="return-arrow" title="back to homepage">
          ↩
        </Link>
      </div>
      <form onSubmit={handleSubmit} id="addApp">
        <h2>Fill in the form with the app information</h2>
        <div>
          <label htmlFor="name">
            App name
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={handleNameChange}
              placeholder="Type in the app name here"
            />
          </label>
        </div>
        <div>
          <label htmlFor="website">
            Official website
            <input
              type="text"
              name="website"
              id="website"
              value={website}
              onChange={handleWebsiteChange}
              placeholder="Type in the app website here"
            />
          </label>
        </div>
        <div>
          <label htmlFor="logo">
            Logo
            <input
              type="text"
              name="logo"
              id="logo"
              value={logo}
              onChange={handleLogoChange}
              placeholder="Type in the image url here"
            />
          </label>
        </div>
        <div>
          <label htmlFor="description">
            Description
            <textarea
              name="description"
              value={description}
              onChange={handleDescriptionChange}
              id="description"
              placeholder="Type in the app description here"
            />
          </label>
        </div>
        <div>
          <label htmlFor="category">
            Category
            <select
              value={category}
              name="category"
              onChange={handleCategoryChange}
              id="category"
            >
              {categoryOptions}
            </select>
          </label>
        </div>
        <p>Available devices</p>
        <div className="checkboxes">
          <label htmlFor="Desktop">
            Desktop
          </label>
          <input
            id="Desktop"
            name="device"
            type="checkbox"
            checked={device.includes('Desktop')}
            onChange={handleCheckbox}
          />
          <label htmlFor="Android">
            Android
          </label>
          <input
            id="Android"
            name="device"
            type="checkbox"
            checked={device.includes('Android')}
            onChange={handleCheckbox}
          />
          <label htmlFor="iOS">
            iOS
          </label>
          <input
            id="iOS"
            name="device"
            type="checkbox"
            checked={device.includes('iOS')}
            onChange={handleCheckbox}
          />
          <label htmlFor="Browser">
            Browser
          </label>
          <input
            id="Browser"
            name="device"
            type="checkbox"
            checked={device.includes('Browser')}
            onChange={handleCheckbox}
          />
        </div>
        <button type="submit">+ Add app</button>
      </form>
    </main>
  );
}

NewAppContainer.propTypes = {
  user: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]),
  history: PropTypes.object.isRequired,
};

export default NewAppContainer;
