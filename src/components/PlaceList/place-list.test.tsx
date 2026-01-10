import { vi } from 'vitest';
import { renderWithProviders } from '../../utils/test-utils';
import PlaceList from './place-list';
import { mockOffers } from '../../mocks/offers';

vi.mock('../PlaceCard/place-card', () => ({
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


