import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import AppsList from './AppsList';

// mainly Jest DOM library assertions
const dummyAppsFiltered = [
  {
    _id: 'dummyId',
    logo: 'dummyLogo',
    name: 'dummyName',
    category: {
      name: 'dummyCategoryName',
    },
  },
];

it('renders without errors', () => {
  const { container } = render(
    <BrowserRouter>
      <AppsList appsFiltered={dummyAppsFiltered} />
    </BrowserRouter>,
  );
  expect(container).toBeInTheDocument();
});

describe('when component is mounted', () => {
  it('displays apps when apps are loaded', async () => {
    render(
      <BrowserRouter>
        <AppsList appsFiltered={dummyAppsFiltered} />
      </BrowserRouter>,
    );

    // use waitFor to wait for expectation to pass
    await waitFor(() => screen.getAllByTestId('app-card'));

    expect(screen.getAllByTestId('app-card')).toHaveLength(1);// appCard component
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('dummyName');
    expect(screen.getByRole('heading', { level: 6 })).toHaveTextContent('dummyCategoryName');
  });

  it('displays NotFoundPage when there are no apps', () => {
    render(
      <BrowserRouter>
        <AppsList appsFiltered={[]} />
      </BrowserRouter>,
    );

    const element = screen.getByTestId('not-found-page');
    expect(element).toBeInTheDocument();
  });
});
