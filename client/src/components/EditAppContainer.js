import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchApp, editApp } from '../services/appLegacy';
import { fetchAllCategories } from '../services/category';
import Loader from './Loader';
import NotFoundPage from './NotFoundPage';
import Button from './Button';

import SharedSnackbarContext from './SharedSnackbar.context';
import SharedDialogContext from './SharedDialog.context';

import './NewAppContainer.scss';

function EditAppContainer({ userId, match, history }) {
  const [name, setName] = useState('');
  const [website, setWebsite] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [device, setDevice] = useState([]);
  const [logo, setLogo] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);

  const { openSnackbar } = useContext(SharedSnackbarContext);
  const { openDialog } = useContext(SharedDialogContext);

  const appId = match.params.id;

  useEffect(() => {
    fetchAllCategories()
      .then((allCategories) => {
        setCategory(allCategories[0]._id);
        setCategories(allCategories);
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
    fetchApp(appId)
      .then((app) => {
        setName(app.name);
        setWebsite(app.website);
        setDescription(app.description);
        setCategory(app.category._id); // key
        setDevice(app.device);
        setLogo(app.logo);
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
  }, [appId]);

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
    const deviceCopy = device.map((selectedDevice) => selectedDevice);

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

  function handleEditSubmit() {
    const editor = userId;
    editApp(appId, name, description, category, device, website, logo, editor)
      .then((editedApp) => {
        openSnackbar(`Your changes on ${editedApp.name} are published!`);
        history.push(`/apps/${editedApp._id}`);
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
  }

  const handleEditPermission = (event) => {
    // prevent brwoser default sends http form request (only send from JS)
    event.preventDefault();

    if (!userId) openDialog('Log in to continue.');
    else handleEditSubmit();
  };

  if (errorMsg) return <NotFoundPage errorMsg={errorMsg} />;
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
        <Link to="./" className="return-arrow" title="back to app">
          ↩
        </Link>
      </div>
      <form onSubmit={handleEditPermission} id="addApp">
        <h2>Edit app</h2>
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
        <Button>↺ Update</Button>
      </form>
    </main>
  );
}

EditAppContainer.propTypes = {
  userId: PropTypes.string,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

EditAppContainer.defaultProps = {
  userId: 'userId',
};

export default EditAppContainer;
