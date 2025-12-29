import { configureStore, PreloadedState } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { reducer } from '../store/reducer';
import { State } from '../types/state';

type RenderOptions = {
  route?: string;
  preloadedState?: PreloadedState<Partial<State>>;
};

export function renderWithProviders(
  ui: JSX.Element,
  { route = '/', preloadedState }: RenderOptions = {}
) {
  const store = configureStore({
    reducer,
    preloadedState: preloadedState as PreloadedState<State>,
  });

  window.history.pushState({}, 'Test page', route);

  return {
    store,
    ...render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>
          {ui}
        </MemoryRouter>
      </Provider>
    ),
  };
}


