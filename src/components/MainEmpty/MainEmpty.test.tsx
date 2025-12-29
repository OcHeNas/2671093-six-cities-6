import { render, screen } from '@testing-library/react';
import MainEmpty from './MainEmpty';

describe('Component: MainEmpty', () => {
  it('should render empty state message', () => {
    render(<MainEmpty />);

    expect(
      screen.getByText(/No places to stay available/i)
    ).toBeInTheDocument();
  });
});
