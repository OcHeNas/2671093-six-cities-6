import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFound from './not-found';

it('renders 404', () => {
  const { getByText } = render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>
  );

  expect(getByText('404')).toBeInTheDocument();
});

