import { render, screen } from '@testing-library/react';
import ReviewsList from './ReviewsList';
import { reviews } from '../../mocks/reviews';

describe('Component: ReviewsList', () => {
  it('should render list of reviews', () => {
    render(<ReviewsList reviews={reviews} />);

    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
  });
});

