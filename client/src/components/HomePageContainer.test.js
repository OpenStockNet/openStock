import * as React from 'react';
import { act, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import HomePageContainer from './HomePageContainer';

import { fetchAllCategories as mockFetchAllCategories } from '../services/category';
import { fetchAllApps as mockFetchAllApps } from '../services/app';

jest.mock('../services/app');
jest.mock('../services/category');

// mock function to return a promise which gets immediately resolved
mockFetchAllCategories.mockResolvedValue([{
  _id: 'dummyCategoryId',
}]);

mockFetchAllApps.mockResolvedValue([{
  _id: 'dummyAppId',
  name: 'dummyAppName',
  category: {
    name: 'dummyCategoryName',
  },
}]);

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
