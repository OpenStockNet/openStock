import * as React from 'react';
import { render } from '@testing-library/react';

import HomePageContainer from './HomePageContainer';

const title = 'If you don\'t protect your privacy, who will?';
const subTitle = 'Find the right app to protect your privacy with OpenStock';

it('renders a title', () => {
  const { getByText } = render(<HomePageContainer />);
  expect(getByText(title)).toBeInTheDocument();
});

it('renders a subTitle', () => {
  const { getByText } = render(<HomePageContainer />);
  expect(getByText(subTitle)).toBeInTheDocument();
});
