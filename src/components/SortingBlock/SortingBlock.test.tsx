import { screen } from '@testing-library/react';
import SortingBlock from './SortingBlock';
import { renderWithProviders } from '../../utils/test-utils';

describe('Component: SortingBlock', () => {
  it('should render sorting options', () => {
    renderWithProviders(<SortingBlock />, {
      preloadedState: {
        selectedSortType: 'Popular',
      },
    });

    expect(screen.getAllByText('Popular').length).toBeGreaterThan(0);
    expect(screen.getByText('Price: low to high')).toBeInTheDocument();
  });
});

