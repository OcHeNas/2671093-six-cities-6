import MockAdapter from 'axios-mock-adapter';
import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducer';
import { createAPI } from '../services/api';
import {
  fetchOffersAction,
  fetchFavoritesAction,
} from './api-actions';
import { mockOffers } from '../mocks/offers';

describe('Async actions', () => {
  const api = createAPI();
  const mockApi = new MockAdapter(api);

  const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: api,
        },
      }),
  });

  it('should fetch offers', async () => {
    mockApi.onGet('/offers').reply(200, mockOffers);

    await store.dispatch(fetchOffersAction());

    expect(store.getState().offersList).toEqual(mockOffers);
  });

  it('should fetch favorites', async () => {
    mockApi.onGet('/favorite').reply(200, mockOffers);

    await store.dispatch(fetchFavoritesAction());

    expect(store.getState().favorites).toEqual(mockOffers);
  });
});

