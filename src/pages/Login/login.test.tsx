import { renderWithProviders } from '../../utils/test-utils';
import Login from './login';

it('renders login form', () => {
  const { getByText } = renderWithProviders(<Login />);
  expect(getByText(/Sign in/i)).toBeInTheDocument();
});
