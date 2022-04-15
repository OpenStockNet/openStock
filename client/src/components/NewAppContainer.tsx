import React, { useState, useEffect, useContext, ChangeEvent, MouseEvent, FormEvent } from 'react';
import { Link, } from 'react-router-dom';
import { History } from 'history';
import { fetchAllCategories, Category, createApp } from '../services/app';
import Loader from './Loader';
import NotFoundPage from './NotFoundPage';
import Button from './Button';

import SharedSnackbarContext from './SharedSnackbar.context';
import SharedDialogContext from './SharedDialog.context';

import './NewAppContainer.scss';

interface Props {
  userId: string,
  history: History, 
}

function NewAppContainer({ userId, history } : Props) {
  const [name, setName] = useState('');
  const [website, setWebsite] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<string>('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [device, setDevice] = useState<string[]>([]);
  const [logo, setLogo] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);

  const { openSnackbar } = useContext(SharedSnackbarContext);
  const { openDialog } = useContext(SharedDialogContext);

  useEffect(() => {
    fetchAllCategories()
      .then((allCategories) => {
        setCategory(allCategories[0]._id); 
        setCategories(allCategories);
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
  }, []);

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  function handleWebsiteChange(event: ChangeEvent<HTMLInputElement>) {
    setWebsite(event.target.value);
  }

  function handleDescriptionChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setDescription(event.target.value);
  }

  function handleLogoChange(event: ChangeEvent<HTMLInputElement>) {
    setLogo(event.target.value);
  }

  function handleCategoryChange(event: ChangeEvent<HTMLSelectElement>) {
    setCategory(event.target.value);
  }

  function handleCheckbox(event: ChangeEvent<HTMLInputElement>) {
    const { id, checked } = event.target;
    // const deviceCopy = device.map((selectedDevice) => selectedDevice);
    const deviceCopy = [...device];
    
    if (checked) {
      deviceCopy.push(id);
    } else {
      const index = deviceCopy.indexOf(id); 
      if (index > -1) { // if exists
        deviceCopy.splice(index, 1); // remove one element from this index
      }
    }
    setDevice(deviceCopy);
  }

  // can also be nested in ensureLogin as in EditApp
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (userId) {
      const creator = userId;

      createApp({name, description, category, device, website, logo, creator})
        .then((app) => {
          history.push(`/apps/${app._id}`);
          openSnackbar(`${app.name} is published. Thanks for your contribution!`);
        })
        .catch((error) => {
          setErrorMsg(error.message);
        });
    } else {
      openDialog('Log in to continue.');
    }
  }

  if (errorMsg) return <NotFoundPage errorMsg={errorMsg!} />;
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
        <Button>+ Add app</Button>
      </form>
    </main>
  );
}


export default NewAppContainer;
