import * as React from 'react';
import {
  act, render, fireEvent, waitFor,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import EditAppContainer from './EditAppContainer';
import { SharedSnackbarProvider } from './SharedSnackbar.context';
import { SharedDialogProvider } from './SharedDialog.context';

import { fetchApp as mockFetchApp, editApp as mockEditApp } from '../services/app';
import { fetchAllCategories as mockFetchAllCategories } from '../services/category';

jest.mock('../services/app');
jest.mock('../services/category');

const dummyUserId = 'dummyUserId';
const dummyAppId = 'dummyAppId';

// match.params.id from react router,
// e.g. openstock.com/apps/edit?id=123&xxx=bbb
const dummyMatch = {
  params: {
    id: dummyAppId,
  },
};
const dummyApp = {
  _id: dummyAppId,
  name: 'dummyAppName',
  website: 'dummyWebsite',
  description: 'dummyDescription',
  category: { _id: 'dummyCategoryId' }, // attention! has nested object
  device: ['Desktop'], // !
  logo: 'dummyLogo',
};

// mock return value: whenever function is used and needs return value,
mockFetchAllCategories.mockResolvedValue([{
  _id: 'dummyCategoryId',
}]);

mockFetchApp.mockResolvedValue(dummyApp);
mockEditApp.mockResolvedValue(dummyApp);

it('renders without errors', async () => {
  let renderResult;
  await act(async () => {
    renderResult = render(
      <BrowserRouter>
        <SharedDialogProvider>
          <SharedSnackbarProvider>
            <EditAppContainer
              userId={dummyUserId}
              match={dummyMatch}
              history={{ push: () => {} }}
            />
          </SharedSnackbarProvider>
        </SharedDialogProvider>
      </BrowserRouter>,
    );
  });

  expect(renderResult.container).toBeInTheDocument();
});

describe('form input', () => {
  it('submits content when edit button is clicked', async () => {
    // 'await' until run all the render cycles due to categories state
    let renderResult;
    await act(async () => {
      renderResult = render(
        <BrowserRouter>
          <SharedDialogProvider>
            <SharedSnackbarProvider>
              <EditAppContainer
                userId={dummyUserId}
                match={dummyMatch}
                history={{ push: () => {} }}
              />
            </SharedSnackbarProvider>
          </SharedDialogProvider>
        </BrowserRouter>,
      );
    });

    const { queryByRole, queryByLabelText } = renderResult;

    // tell FireEvent.input funcs which to trigger
    fireEvent.input(queryByLabelText('App name'), { target: { value: 'testing app' } });
    fireEvent.input(queryByLabelText('Description'), { target: { value: 'testing description' } });
    // dropdown
    fireEvent.change(queryByLabelText('Category'), { target: { value: 'dummyCategoryId' } });
    // checkbox
    fireEvent.click(queryByLabelText('Browser'));
    fireEvent.input(queryByLabelText('Official website'), { target: { value: 'testing website' } });
    fireEvent.input(queryByLabelText('Logo'), { target: { value: 'testing logo' } });

    // wait for rerender to be done: openSnackbar, errormsg or dialog
    await waitFor(() => fireEvent.click(queryByRole('button')));
    expect(mockEditApp).toHaveBeenCalled();
    expect(mockEditApp).toHaveBeenCalledWith(dummyAppId, 'testing app', 'testing description', 'dummyCategoryId', ['Desktop', 'Browser'], 'testing website', 'testing logo', dummyUserId);
  });
});
