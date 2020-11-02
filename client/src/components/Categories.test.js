import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Categories from './Categories';
import { MockIcon } from '../images/__mocks__';

// Manual mocks are defined by writing a module in a __mocks__/ subdirectory adjacent to the module
// To require that module in tests, explicitly calling jest.mock('./moduleName') required
jest.mock('../images');
// testing array mapping passed by props
const cats = [
  {
    _id: '5ec3f4b4acf2b8e9dd1a3388',
    name: 'Browser',
    icon: 'MockIcon',
  },
];
const mockAppsList = [
  {
    category: {
      _id: '5ec3f4b4acf2b8e9dd1a3388',
    },
  },
  {
    category: {
      _id: '5ec3f4b4acf2b8e9dd1a4466',
    },
  },
];

it('renders without errors', () => {
  const { container } = render(
    <Categories
      category={cats}
    />,
  );
  expect(container).toBeInTheDocument();
});

it('displays category name', () => {
  const { getAllByText } = render(
    <Categories
      category={cats}
    />,
  );

  const elements = getAllByText(cats[0].name);
  // carousel packeage renders minimum 3 sections
  const element = elements[0];

  expect(element).toBeInTheDocument();
  expect(element.tagName).toEqual('P');
});

it('displays category icon', () => {
  const { getAllByRole } = render(
    <Categories
      category={cats}
    />,
  );

  const elements = getAllByRole('img');
  const element = elements[0];
  expect(element).toBeInTheDocument();
  expect(element.getAttribute('src')).toEqual(MockIcon);
});

describe('filter categories', () => {
  it('has certain number of cat btns', () => {
    const { queryAllByTestId } = render(
      <Categories
        category={cats}
      />,
    );

    // carousel pck renders minimum 3 sections; though we only has 1 here
    expect(queryAllByTestId('filter-button')).toHaveLength(3);
  });

  it('filter is called after click', () => {
    // first check if btn exists
    const mockSetApps = jest.fn();
    const mockSetQuery = jest.fn();
    const { queryAllByTestId } = render(
      <Categories
        category={cats}
        setApps={mockSetApps}
        setQuery={mockSetQuery}
        appsList={mockAppsList}
      />,
    );
    // commont out fireEvent to test if it fails without click
    fireEvent.click(queryAllByTestId('filter-button')[0]);
    expect(mockSetApps).toHaveBeenCalled();
    expect(mockSetQuery).toHaveBeenCalled();
  });

  it('filters apps', () => {
    const mockSetApps = jest.fn();
    const mockSetQuery = jest.fn();
    const { queryAllByTestId } = render(
      <Categories
        category={cats}
        setApps={mockSetApps}
        setQuery={mockSetQuery}
        appsList={mockAppsList}
      />,
    );

    const filteredAppsList = [
      {
        category: {
          _id: '5ec3f4b4acf2b8e9dd1a3388',
        },
      },
    ];
    // test if fails by e.g. changing cat id
    fireEvent.click(queryAllByTestId('filter-button')[0]);
    expect(mockSetApps).toHaveBeenCalledWith(filteredAppsList);
  });

  it('clears search query when category btn is clicked', () => {
    const mockSetApps = jest.fn();
    const mockSetQuery = jest.fn();
    const { queryAllByTestId } = render(
      <Categories
        category={cats}
        setApps={mockSetApps}
        setQuery={mockSetQuery}
        appsList={mockAppsList}
      />,
    );

    // test if fails e.g. by changing query str
    fireEvent.click(queryAllByTestId('filter-button')[0]);
    expect(mockSetQuery).toHaveBeenCalledWith('');
  });
});
