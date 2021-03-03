import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import AppCard from './AppCard';

it('renders without errors', () => {
  const { container } = render(
    <BrowserRouter>
      <AppCard
        appId="dummyId"
        appName="dummyName"
        appCategoryName="dummyCategoryName"
      />
    </BrowserRouter>,
  );
  expect(container).toBeInTheDocument();
});

// test by tag
it('displays app name', () => {
  const name = 'testing name';
  const { getByText } = render(
    <BrowserRouter>
      <AppCard
        appId="dummyId"
        appName={name}
        appCategoryName="dummyCategoryName"
      />
    </BrowserRouter>,
  );

  const element = getByText(name);

  expect(element).toBeInTheDocument();
  expect(element.tagName).toEqual('H3');
});

it('displays app category', () => {
  const dummyCategoryName = 'testing category';
  const { getByText } = render(
    <BrowserRouter>
      <AppCard
        appId="dummyId"
        appName="dummyName"
        appCategoryName={dummyCategoryName}
      />
    </BrowserRouter>,
  );

  const element = getByText(dummyCategoryName);

  expect(element).toBeInTheDocument();
  expect(element.tagName).toEqual('H6');
});

// test by attribute
it('has app id in link', () => {
  const id = '20201015';
  const { getAllByRole } = render(
    <BrowserRouter>
      <AppCard
        appId={id}
        appName="dummyName"
        appCategoryName="dummyCategoryName"
      />
    </BrowserRouter>,
  );

  const elements = getAllByRole('link');
  expect(elements[0]).toBeInTheDocument();
  expect(elements[0].getAttribute('href')).toEqual(`/apps/${id}`);
});

it('displays app logo', () => {
  const imgSrc = 'app logo';
  const { getByRole } = render(
    <BrowserRouter>
      <AppCard
        src={imgSrc}
        appId="dummyId"
        appName="dummyName"
        appCategoryName="dummyCategoryName"
      />
    </BrowserRouter>,
  );

  const element = getByRole('img');
  expect(element).toBeInTheDocument();
  expect(element.getAttribute('src')).toEqual(imgSrc);
});
