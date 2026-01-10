import { screen } from '@testing-library/react';
import PrivateRoute from './private-route';
import { AuthorizationStatus } from '../../const';
import { renderWithProviders } from '../../utils/test-utils';

describe('Component: PrivateRoute', () => {
  it('should render children for authorized user', () => {
    renderWithProviders(
      <PrivateRoute>
        <div>Private Content</div>
      </PrivateRoute>,
      {
        preloadedState: {
          authorizationStatus: AuthorizationStatus.Auth,
        },
      }
    );

    expect(screen.getByText('Private Content')).toBeInTheDocument();
  });

  it('should redirect unauthorized user to login', () => {
    renderWithProviders(
      <PrivateRoute>
        <div>Private Content</div>
      </PrivateRoute>,
      {
        route: '/favorites',
        preloadedState: {
          authorizationStatus: AuthorizationStatus.NoAuth,
        },
      }
    );

    expect(screen.queryByText('Private Content')).not.toBeInTheDocument();
  });
});
