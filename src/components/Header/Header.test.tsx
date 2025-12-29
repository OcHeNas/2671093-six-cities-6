import { screen } from '@testing-library/react';
import Header from './Header';
import { renderWithProviders } from '../../utils/test-utils';
import { mockOffer } from '../../mocks/offers';

describe('Component: Header', () => {
  it('should render user email and favorites count', () => {
    renderWithProviders(<Header />, {
      preloadedState: {
        userEmail: 'test@test.com',
        favorites: [mockOffer],
      },
    });

    expect(screen.getByText('test@test.com')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });
});

