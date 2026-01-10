import { renderWithProviders } from '../../utils/test-utils';
import CommentForm from './comment-form';

it('renders comment form', () => {
  const { getByPlaceholderText } = renderWithProviders(<CommentForm offerId="1" />);
  expect(getByPlaceholderText(/Tell how was your stay/i)).toBeInTheDocument();
});
