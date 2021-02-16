import * as React from 'react';
import {
  act, fireEvent, render, waitFor,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import HomePageContainer from './HomePageContainer';

import { fetchAllCategories as mockFetchAllCategories } from '../services/category';
import { fetchAllApps as mockFetchAllApps } from '../services/app';

jest.mock('../services/app');
jest.mock('../services/category');

// mock function to return a promise which gets immediately resolved
// make sure mock all required data, e.g. cat id required for filtering
mockFetchAllCategories.mockResolvedValue([{
  _id: 'dummyCategoryId',
  name: 'dummyCategoryName',
},
{
  _id: 'secondCategoryId',
  name: 'secondCategoryName',
},
]);

mockFetchAllApps.mockResolvedValue([{
  _id: 'dummyAppId',
  name: 'dummyAppName',
  category: {
    name: 'dummyCategoryName',
    _id: 'dummyCategoryId',
  },
},
{
  _id: 'secondAppId',
  name: 'secondAppName',
  category: {
    name: 'secondCategoryName',
    _id: 'secondCategoryId',
  },
},
]);

it('renders without errors', async () => {
  let renderResult;
  await act(async () => {
    renderResult = render(
      <BrowserRouter>
        <HomePageContainer />
      </BrowserRouter>,
    );
  });

  expect(renderResult.container).toBeInTheDocument();
});

describe('children components', () => {
  it('displays correct headings', async () => {
    // wait for NotFroundPage and Loader to be done
    let renderResult;
    await act(async () => {
      renderResult = render(
        <BrowserRouter>
          <HomePageContainer />
        </BrowserRouter>,
      );
    });

    const { getByRole } = renderResult;

    const majorHeading = getByRole('heading', { level: 1 });
    expect(majorHeading).toHaveTextContent("If you don't protect your privacy, who will?");

    const secondaryHeading = getByRole('heading', { level: 2 });
    expect(secondaryHeading).toHaveTextContent('Find the right app to protect your privacy with OpenStock');
  });

  it('displays search terms user enters', async () => {
    let renderResult;
    await act(async () => {
      renderResult = render(
        <BrowserRouter>
          <HomePageContainer />
        </BrowserRouter>,
      );
    });

    const { getByPlaceholderText, getByRole } = renderResult;

    const searchBar = getByRole('search');
    expect(searchBar).toBeInTheDocument();

    const inputField = getByPlaceholderText(/Search app by name/i);
    expect(inputField).toBeInTheDocument();

    await waitFor(() => fireEvent.change(inputField, { target: { value: 'dummy input' } }));
    expect(inputField.value).toEqual('dummy input');
  });

  it('displays apps filtered by search terms', async () => {
    let renderResult;
    await act(async () => {
      renderResult = render(
        <BrowserRouter>
          <HomePageContainer />
        </BrowserRouter>,
      );
    });

    const { getByPlaceholderText, getByRole } = renderResult;

    const inputField = getByPlaceholderText(/Search app by name/i);
    await waitFor(() => fireEvent.change(inputField, { target: { value: 's' } }));
    expect(getByRole('heading', { level: 3 })).toHaveTextContent('secondAppName');
    expect(getByRole('heading', { level: 3 })).not.toHaveTextContent('dummyAppName'); // jest-dorm assertions
  });

  it('displays apps filtered by categories', async () => {
    let renderResult;
    await act(async () => {
      renderResult = render(
        <BrowserRouter>
          <HomePageContainer />
        </BrowserRouter>,
      );
    });

    const {
      getByRole, getAllByTestId,
    } = renderResult;

    const selectedCategoryButton = getAllByTestId('filter-button')[1];
    await waitFor(() => fireEvent.click(selectedCategoryButton));

    expect(getByRole('heading', { level: 3 })).toHaveTextContent('secondAppName');
    expect(getByRole('heading', { level: 6 })).not.toHaveTextContent('dummyCategoryName');
    expect(selectedCategoryButton).toHaveClass('btnCategories selected');
  });
});
