import { vi } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../utils/test-utils';
import FavouritesCityBlock from './favourites-city-block';
import { mockOffers } from '../../mocks/offers';

vi.mock('../PlaceCard/place-card', () => ({
  default: () => <div data-testid="place-card" />,
}));

describe('Component: FavouritesCityBlock', () => {
  it('renders city name and favourite offers', () => {
    renderWithProviders(
      <ul>
        <FavouritesCityBlock
          city="Paris"
          places={mockOffers}
        />
      </ul>
    );

    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(
      document.querySelectorAll('[data-testid="place-card"]')
    ).toHaveLength(mockOffers.length);
  });
});


