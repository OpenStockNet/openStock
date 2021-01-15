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
      categories={cats}
      selectedCategory="dummyCategoryId"
      onCategoryChange={() => {}}
    />,
  );
  expect(container).toBeInTheDocument();
});

it('displays category name', () => {
  const { getAllByText } = render(
    <Categories
      categories={cats}
      selectedCategory="dummyCategoryId"
      onCategoryChange={() => {}}
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
      categories={cats}
      selectedCategory="dummyCategoryId"
      onCategoryChange={() => {}}
    />,
  );

  const elements = getAllByRole('img');
  const element = elements[1]; // pick 2nd element, as 1st ALL isn't mapped
  expect(element).toBeInTheDocument();
  expect(element.getAttribute('src')).toEqual(MockIcon);
});

describe('filter categories', () => {
  it('has certain number of cat btns', () => {
    const { queryAllByTestId } = render(
      <Categories
        categories={cats}
        selectedCategory="dummyCategoryId"
        onCategoryChange={() => {}}
      />,
    );

    // carousel lib renders minimum 3 sections; and we have 1 ALL + 1 rest from cats
    expect(queryAllByTestId('filter-button')).toHaveLength(6);
  });

  it('filter is called after click', () => {
    const mockOnCategoryChange = jest.fn();
    const { queryAllByTestId } = render(
      <Categories
        categories={cats}
        selectedCategory="dummyCategoryId"
        onCategoryChange={mockOnCategoryChange}
      />,
    );
    // fireEvent of click
    fireEvent.click(queryAllByTestId('filter-button')[0]);
    expect(mockOnCategoryChange).toHaveBeenCalled();
  });

  it('filters apps', () => {
    const mockOnCategoryChange = jest.fn();
    const { queryAllByTestId } = render(
      <Categories
        categories={cats}
        selectedCategory="dummyCategoryId"
        onCategoryChange={mockOnCategoryChange}
      />,
    );

    const filteredAppsList = [
      {
        category: {
          _id: '5ec3f4b4acf2b8e9dd1a3388',
        },
      },
    ];
    // pick 2nd item because 1st item ALL is hard coded
    fireEvent.click(queryAllByTestId('filter-button')[1]);
    expect(mockOnCategoryChange).toHaveBeenCalledWith(filteredAppsList[0].category._id);
  });
});
