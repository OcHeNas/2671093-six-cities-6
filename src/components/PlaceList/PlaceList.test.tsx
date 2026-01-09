import { vi } from 'vitest';
import { renderWithProviders } from '../../utils/test-utils';
import PlaceList from './PlaceList';
import { mockOffers } from '../../mocks/offers';

vi.mock('../PlaceCard/PlaceCard', () => ({
  default: () => <div data-testid="place-card" />,
}));

describe('Component: PlaceList', () => {
  it('renders sorted offers list', () => {
    renderWithProviders(
      <PlaceList offers={mockOffers} />,
      {
        preloadedState: {
          selectedSortType: 'Popular',
        },
      }
    );

    expect(
      document.querySelectorAll('[data-testid="place-card"]')
    ).toHaveLength(mockOffers.length);
  });
});


