import { vi } from 'vitest';
import { renderWithProviders } from '../../utils/test-utils';
import NearestCardList from './NearestCardList';
import { mockOffers } from '../../mocks/offers';

vi.mock('../PlaceCard/PlaceCard', () => ({
  default: () => <div data-testid="place-card" />,
}));

describe('Component: NearestCardList', () => {
  it('renders nearest offers', () => {
    renderWithProviders(
      <NearestCardList offers={mockOffers} />
    );

    expect(
      document.querySelectorAll('[data-testid="place-card"]')
    ).toHaveLength(mockOffers.length);
  });
});

