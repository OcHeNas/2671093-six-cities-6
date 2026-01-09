import { renderWithProviders } from '../../utils/test-utils';
import Main from './main';

describe('Page: Main', () => {
  it('renders empty state when no offers', () => {
    const { getByText } = renderWithProviders(<Main />);

    expect(
      getByText(/No places to stay available/i)
    ).toBeInTheDocument();
  });
});

