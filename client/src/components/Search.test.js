import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import Search from './Search';
import { SearchIcon } from '../images'; // make sure add SearchIcon in _mocks_ folder

jest.mock('../images');

it('renders without errors', () => {
  const { container } = render(
    <BrowserRouter>
      <Search
        onSearchTermsChange={() => {}}
        searchTerms="dummySearchTerms"
      />
      ,
    </BrowserRouter>,
  );

  expect(container).toBeInTheDocument();
});

it('shows props user name and password in input fields', () => {
  render(
    <BrowserRouter>
      <Search
        onSearchTermsChange={() => {}}
        searchTerms="dummySearchTerms"
      />
      ,
    </BrowserRouter>,
  );

  const lastSearchInput = screen.getByPlaceholderText('Search app by name'); // return <input/> object
  expect(lastSearchInput).toHaveDisplayValue('dummySearchTerms'); // jest-dorm libraray assertion
});

it('calls onSearchTermChange when prop input value changes', () => {
  const handleSearchTermsChangeMock = jest.fn();

  render(
    <BrowserRouter>
      <Search
        onSearchTermsChange={handleSearchTermsChangeMock}
        searchTerms="dummySearchTerms"
      />
      ,
    </BrowserRouter>,
  );

  const lastSearchInput = screen.getByPlaceholderText('Search app by name'); // return <input/> object
  fireEvent.change(lastSearchInput, { target: { value: 'changeSearchInput' } });

  expect(handleSearchTermsChangeMock).toHaveBeenCalled();
  expect(handleSearchTermsChangeMock).toHaveBeenCalledWith('changeSearchInput');
});

it('displays search icon', () => {
  render(
    <BrowserRouter>
      <Search
        onSearchTermsChange={() => {}}
        searchTerms="dummySearchTerms"
      />
      ,
    </BrowserRouter>,
  );

  const searchIcon = screen.getByRole('img');
  expect(searchIcon).toBeInTheDocument();
  expect(searchIcon.getAttribute('src')).toEqual(SearchIcon);
});
