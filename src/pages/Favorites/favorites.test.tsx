import { renderWithProviders } from '../../utils/test-utils';
import Favorites from './favorites';

it('renders empty favorites', () => {
  const { getByText } = renderWithProviders(<Favorites />);
  expect(getByText(/Nothing yet saved/i)).toBeInTheDocument();
});
