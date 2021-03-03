import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Categories from './Categories';
// eslint-disable-next-line jest/no-mocks-import
import { MockIcon } from '../images/__mocks__'; // required as we export icons from index

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
  // carousel lib renders minimum 3 sections
  const element = elements[0];

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

    // carousel lib renders minimum 3 sections; and we have 1 from cats
    expect(queryAllByTestId('filter-button')).toHaveLength(1);
  });

  it('calls filter function after click', () => {
    const mockOnCategoryChange = jest.fn();
    const { queryAllByTestId } = render(
      <Categories
        categories={cats}
        selectedCategory="dummyCategoryId"
        onCategoryChange={mockOnCategoryChange}
      />,
    );

    fireEvent.click(queryAllByTestId('filter-button')[0]);
    expect(mockOnCategoryChange).toHaveBeenCalled();
  });

  it('filters apps by category', () => {
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

    fireEvent.click(queryAllByTestId('filter-button')[0]);
    expect(mockOnCategoryChange).toHaveBeenCalledWith(filteredAppsList[0].category._id);
  });
});
