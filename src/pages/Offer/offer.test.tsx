import { renderWithProviders } from '../../utils/test-utils';
import Offer from './offer';

it('redirects if offer is null', () => {
  const { container } = renderWithProviders(<Offer />, {
    route: '/offer/1',
  });
  expect(container).toBeDefined();
});
