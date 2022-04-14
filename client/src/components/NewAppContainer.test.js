import * as React from 'react';
import {
  act, render, fireEvent,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NewAppContainer from './NewAppContainer';
import { SharedSnackbarProvider } from './SharedSnackbar.context';
import { SharedDialogProvider } from './SharedDialog.context';

import { createApp as mockCreateApp } from '../services/appLegacy';
import { fetchAllCategories as mockFetchAllCategories } from '../services/categoryLegacy';

jest.mock('../services/appLegacy');
jest.mock('../services/category');
// to resolve jsDom (testing browser) doesn't implement alert method
// jest.spyOn(window, 'alert').mockImplementation(() => {});

const dummyUserId = 'dummyUserId';

beforeEach(() => {
  mockFetchAllCategories.mockResolvedValue([{
    _id: 'dummyCategoryId',
  }]);
});

it('renders without errors', async () => {
  let renderResult;
  await act(async () => {
    renderResult = render(
      <BrowserRouter>
        <SharedDialogProvider>
          <SharedSnackbarProvider>
            <NewAppContainer userId={dummyUserId} history={{ push: () => {} }} />
          </SharedSnackbarProvider>
        </SharedDialogProvider>
      </BrowserRouter>,
    );
  });

  expect(renderResult.container).toBeInTheDocument();
});

describe('form input', () => {
  it('submits content when button is clicked', async () => {
    mockCreateApp.mockResolvedValueOnce({
      _id: 'dummyAppId',
    });

    // 'await' until run all the render cycles due to categories state
    let renderResult;
    await act(async () => {
      renderResult = render(
        <BrowserRouter>
          <SharedDialogProvider>
            <SharedSnackbarProvider>
              <NewAppContainer
                userId={dummyUserId}
                history={{ push: () => {} }}
              />
              ,
            </SharedSnackbarProvider>
          </SharedDialogProvider>
        </BrowserRouter>,
      );
    });

    // declare functions as properties of renderResult obj
    const { queryByRole, queryByLabelText } = renderResult;

    // input field
    fireEvent.input(queryByLabelText('App name'), { target: { value: 'testing app' } });
    fireEvent.input(queryByLabelText('Description'), { target: { value: 'testing description' } });
    // dropdown
    fireEvent.change(queryByLabelText('Category'), { target: { value: 'dummyCategoryId' } });
    // checkbox
    fireEvent.click(queryByLabelText('Desktop'));
    fireEvent.input(queryByLabelText('Official website'), { target: { value: 'testing website' } });
    fireEvent.input(queryByLabelText('Logo'), { target: { value: 'testing logo' } });

    // wait for rerender to be done: openSnackbar, errormsg or dialog
    // also valid: await waitFor(() => fireEvent.click(queryByRole('button')));
    await act(async () => fireEvent.click(queryByRole('button')));

    expect(mockCreateApp).toHaveBeenCalledWith('testing app', 'testing description', 'dummyCategoryId', ['Desktop'], 'testing website', 'testing logo', 'dummyUserId');
  });
});
