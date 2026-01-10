import { renderWithProviders } from '../../utils/test-utils';
import CitiesList from './cities-list';
import { Cities } from '../../const';

it('renders cities', () => {
  const { getByText } = renderWithProviders(<CitiesList cities={Cities} />);
  expect(getByText(Cities[0].name)).toBeInTheDocument();
});
