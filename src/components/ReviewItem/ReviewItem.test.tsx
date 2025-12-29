import { render, screen } from '@testing-library/react';
import ReviewItem from './ReviewItem';
import { reviews } from '../../mocks/reviews';

describe('Component: ReviewItem', () => {
  it('should render review data', () => {
    render(<ReviewItem review={reviews[0]} />);

    expect(screen.getByText(reviews[0].comment)).toBeInTheDocument();
    expect(screen.getByText(reviews[0].user.name)).toBeInTheDocument();
  });
});
