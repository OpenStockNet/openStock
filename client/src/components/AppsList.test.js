import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import AppsList from './AppsList';

// basic test of rendering a whole component
it('renders without errors', () => {
  const { container } = render(
    <BrowserRouter>
      <AppsList />
    </BrowserRouter>,
  );
  expect(container).toBeInTheDocument();
});

// test by tag
it('displays app name', () => {
  const name = 'testing name';
  const { getByText } = render(
    <BrowserRouter>
      <AppsList
        appName={name}
      />
    </BrowserRouter>,
  );

  const element = getByText(name);

  expect(element).toBeInTheDocument();
  expect(element.tagName).toEqual('H3');
});

it('displays app category', () => {
  const name = 'testing category';
  const { getByText } = render(
    <BrowserRouter>
      <AppsList
        appCategoryName={name}
      />
    </BrowserRouter>,
  );

  const element = getByText(name);

  expect(element).toBeInTheDocument();
  expect(element.tagName).toEqual('H6');
});

// test by attribute
it('has app id in link', () => {
  const id = '20201015';
  const { getAllByRole } = render(
    <BrowserRouter>
      <AppsList
        appId={id}
      />
    </BrowserRouter>,
  );

  const elements = getAllByRole('link');
  expect(elements[0]).toBeInTheDocument();
  expect(elements[0].getAttribute('href')).toEqual(`/apps/${id}`);
});

it('display app logo', () => {
  const imgSrc = 'app logo';
  const { getByRole } = render(
    <BrowserRouter>
      <AppsList
        src={imgSrc}
      />
    </BrowserRouter>,
  );

  const element = getByRole('img');
  expect(element).toBeInTheDocument();
  expect(element.getAttribute('src')).toEqual(imgSrc);
});
