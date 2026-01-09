import { renderWithProviders } from '../../utils/test-utils';
import CitiesList from './CitiesList';
import { Cities } from '../../const';

it('renders cities', () => {
  const { getByText } = renderWithProviders(<CitiesList cities={Cities} />);
  expect(getByText(Cities[0].name)).toBeInTheDocument();
});
