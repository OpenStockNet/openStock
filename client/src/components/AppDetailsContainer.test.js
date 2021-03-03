import * as React from 'react';
import {
  act, fireEvent, render, waitFor,
} from '@testing-library/react';
import { BrowserRouter, Route } from 'react-router-dom';
import { SharedSnackbarProvider } from './SharedSnackbar.context';
import { SharedDialogProvider } from './SharedDialog.context';

import AppDetailsContainer from './AppDetailsContainer';

import {
  fetchApp as mockFetchApp, addWishApp as mockAddWishApp, removeWishApp as mockRemoveWishApp,
} from '../services/app';
import { getAverageRating as mockGetAverageRating } from '../services/rating';
import { fetchReviews as mockFetchReviews, addReview as mockAddReview } from '../services/review';

jest.mock('../services/app');
jest.mock('../services/rating');
jest.mock('../services/review');

const dummyAppId = 'dummyAppId';
const dummyAppName = 'dummyAppName';
const dummyUserId = 'dummyUserId';
const dummyUserName = 'dummyUserName';
const dummyWishUserId = 'dummyWishUserId';

const dummyApp = {
  _id: dummyAppId,
  name: dummyAppName,
  website: 'dummyWebsite',
  description: 'dummyDescription',
  category: { _id: 'dummyCategoryId', name: 'dummyCategoryName' },
  device: ['Desktop'],
  logo: 'dummyLogo',
  // populated
  creator: { _id: 'dummyCreatorId', name: 'dummyCreatorName' },
  // not populated [objectId, objectId, objectId]
  wishUser: [
    dummyWishUserId,
  ],
  // populated
  editors: [{
    _id: 'dummyEditorUserId',
    username: 'dummyEditorUserName',
  }],
};

// match.params.id from react router,
// e.g. openstock.com/apps/edit?id=123&xxx=bbb
const dummyMatch = {
  params: {
    id: dummyAppId,
  },
};

const dummyAverageRating = {
  value: 5,
  app: {
    _id: dummyAppId,
  },
};

const dummyReviews = [{
  _id: 'dummyReviewId',
  value: 'dummyReviewInput',
  user: {
    _id: dummyUserId,
    username: dummyUserName,
  },
  updatedAt: '12345',
}];

mockFetchApp.mockResolvedValue(dummyApp);// returns resolved value xxx: averageRating.then(xxx)
mockGetAverageRating.mockResolvedValue(dummyAverageRating.value);
mockFetchReviews.mockResolvedValue(dummyReviews);

it('renders without errors', async () => {
  const renderResult = await init(); // wait for async func init() to return promise
  expect(renderResult.container).toBeInTheDocument();
});

describe('user use features successfully', () => {
  it('user adds app to wishlist when clicking on button', async () => {
    mockAddWishApp.mockResolvedValue();

    // const renderResult = await init();
    // const { findByText, getByTitle } = renderResult;
    const { findByText, getByTitle } = await init(); // declare properties to init() rendered result

    const buttonToAdd = getByTitle('add to wish list');
    await waitFor(() => fireEvent.click(buttonToAdd));
    expect(mockAddWishApp).toHaveBeenCalledWith(dummyAppId, dummyUserId);

    // snackbar open showing the successful text
    const snackbar = await findByText('dummyAppName is added to wish list!');
    expect(snackbar).toBeInTheDocument();
  });

  it('user removes app from wishlist when clicking on button', async () => {
    mockRemoveWishApp.mockResolvedValue();

    let renderResult;
    await act(async () => {
      renderResult = render(
        <BrowserRouter>
          <SharedDialogProvider>
            <SharedSnackbarProvider>
              <AppDetailsContainer
                userId={dummyWishUserId}
                match={dummyMatch}
                history={{ push: () => {} }}
              />
            </SharedSnackbarProvider>
          </SharedDialogProvider>
        </BrowserRouter>,
      );
    });

    const { findByTitle, findByText } = renderResult;

    const buttonToRemove = await findByTitle('added to wish list');
    await waitFor(() => fireEvent.click(buttonToRemove));
    expect(mockRemoveWishApp).toHaveBeenCalledWith(dummyAppId, dummyWishUserId);

    const snackbar = await findByText('dummyAppName is removed from wish list!');
    expect(snackbar).toBeInTheDocument();
  });

  it('link redirects to edit page when clicking on button', async () => {
    let renderResult;
    await act(async () => {
      renderResult = render(
        <BrowserRouter>
          <SharedDialogProvider>
            <SharedSnackbarProvider>
              <AppDetailsContainer
                userId={dummyUserId}
                match={dummyMatch}
                history={{ push: () => {} }}
              />
            </SharedSnackbarProvider>
          </SharedDialogProvider>
          <Route path="/apps/dummyAppId/edit">Mock Edit</Route>
        </BrowserRouter>,
      );
    });

    const { getByTitle, findByText } = renderResult;

    const buttonToEdit = getByTitle('edit');
    await waitFor(() => fireEvent.click(buttonToEdit));
    // make sure add mock route <Route/> to open
    const editPageContent = await findByText('Mock Edit');
    expect(editPageContent).toBeInTheDocument();
  });

  it('displays user name, comments and time stamp after clicking comment button', async () => {
    mockAddReview.mockResolvedValue(dummyReviews); // no specific value to be resolved
    // let renderResult = await init();
    // const { getByText, findAllByRole, findByText } = renderResult;

    const { getByText, findAllByRole, findByText } = await init();

    const buttonToPost = getByText(/post/i);
    fireEvent.click(buttonToPost);

    const elements = await findAllByRole('heading', { level: 5 });
    expect(elements[1]).toHaveTextContent(dummyUserName);
    expect(elements[2]).toHaveTextContent('12345'); // time stamp

    const reviewInput = await findByText('dummyReviewInput');
    expect(reviewInput).toBeInTheDocument();

    // open snackbar showing sucessful message
    const snackbar = await findByText('Thanks for sharing your thoughts!');
    expect(snackbar).toBeInTheDocument();
  });
});

async function init() {
  let renderResult;
  await act(async () => {
    renderResult = render(
      <BrowserRouter>
        <SharedDialogProvider>
          <SharedSnackbarProvider>
            <AppDetailsContainer
              userId={dummyUserId}
              match={dummyMatch}
              history={{ push: () => {} }}
            />
          </SharedSnackbarProvider>
        </SharedDialogProvider>
      </BrowserRouter>,
    );
  });

  return renderResult;
}
