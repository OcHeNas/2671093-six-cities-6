import { render } from '@testing-library/react';
import CitiesMap from './CitiesMap';
import { mockOffer } from '../../mocks/offers';

it('renders map container', () => {
  const { container } = render(
    <CitiesMap city={mockOffer.city} points={[mockOffer]} />
  );
  expect(container.querySelector('.cities__map')).toBeInTheDocument();
});
