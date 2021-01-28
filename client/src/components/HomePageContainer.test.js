import * as React from 'react';
import { render } from '@testing-library/react';

import HomePageContainer from './HomePageContainer';

it('renders without errors', () => {
  const { container } = render(
    <HomePageContainer />,
  );
  expect(container).toBeInTheDocument();
});
