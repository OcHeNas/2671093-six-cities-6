import { renderWithProviders } from '../../utils/test-utils';
import CommentForm from './CommentForm';

it('renders comment form', () => {
  const { getByPlaceholderText } = renderWithProviders(<CommentForm offerId="1" />);
  expect(getByPlaceholderText(/Tell how was your stay/i)).toBeInTheDocument();
});
