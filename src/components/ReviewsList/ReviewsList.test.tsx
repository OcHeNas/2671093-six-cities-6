import { render, screen } from '@testing-library/react';
import ReviewsList from './ReviewsList';
import { reviews } from '../../mocks/reviews';

describe('Component: ReviewsList', () => {
  it('should render list of reviews', () => {
    render(<ReviewsList reviews={reviews} />);

    // Проверяем, что отрисованы элементы списка
    const reviewItems = screen.getAllByRole('listitem');
    expect(reviewItems.length).toBeLessThanOrEqual(10);

    // Проверяем, что текст отзывов присутствует (их может быть несколько)
    const reviewTexts = screen.getAllByText(
      /A quiet cozy and picturesque that hides behind/i
    );
    expect(reviewTexts.length).toBeGreaterThan(0);
  });
});


