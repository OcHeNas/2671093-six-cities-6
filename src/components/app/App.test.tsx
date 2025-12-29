import { screen } from '@testing-library/react';
import App from './app';
import { renderWithProviders } from '../../utils/test-utils';
import { AuthorizationStatus } from '../../const';
import { vi } from 'vitest';

// Тип для моков asyncThunk
type MockAsyncThunk = (() => { type: string }) & {
  pending: string;
  fulfilled: string;
  rejected: string;
};

// Мокаем asyncThunk с уникальными типами
vi.mock('../../store/api-actions', () => {
  const createMockThunk = (name: string): MockAsyncThunk => {
    const thunk = (() => ({ type: `${name}/mocked` })) as unknown as MockAsyncThunk;
    thunk.pending = `${name}/pending`;
    thunk.fulfilled = `${name}/fulfilled`;
    thunk.rejected = `${name}/rejected`;
    return thunk;
  };

  return {
    fetchOffersAction: createMockThunk('fetchOffersAction'),
    fetchOfferAction: createMockThunk('fetchOfferAction'),
    fetchNearbyOffersAction: createMockThunk('fetchNearbyOffersAction'),
    fetchCommentsAction: createMockThunk('fetchCommentsAction'),
    postCommentAction: createMockThunk('postCommentAction'),
    fetchFavoritesAction: createMockThunk('fetchFavoritesAction'),
    toggleFavoriteAction: createMockThunk('toggleFavoriteAction'),
    checkAuthAction: createMockThunk('checkAuthAction'),
    loginAction: createMockThunk('loginAction'),
  };
});

// Тестовые данные
const fakeOffers = [
  {
    id: '1',
    title: 'Beautiful Apartment',
    city: { name: 'Paris', location: { latitude: 48.8566, longitude: 2.3522, zoom: 13 } },
    previewImage: 'img1.jpg',
    images: ['img1.jpg'],
    price: 100,
    rating: 4,
    type: 'apartment',
    bedrooms: 1,
    maxAdults: 2,
    isFavorite: false,
    isPremium: false,
    goods: ['Wi-Fi'],
    host: { id: 1, name: 'Host', isPro: false, avatarUrl: 'avatar.jpg' },
    description: 'Nice place',
    location: { latitude: 48.8566, longitude: 2.3522, zoom: 13 },
  },
];

describe('Application Routing', () => {
  it('should render Main page on "/"', () => {
    renderWithProviders(<App />, {
      route: '/',
      preloadedState: {
        authorizationStatus: AuthorizationStatus.Auth,
        offersList: fakeOffers,
        isOffersLoading: false,
        city: 'Paris',
        isOfferLoading: false,
        nearbyOffers: [],
        comments: [],
      },
    });

    expect(screen.getByText(/Beautiful Apartment/i)).toBeInTheDocument();
  });

  it('should render Login page on "/login"', () => {
    renderWithProviders(<App />, {
      route: '/login',
      preloadedState: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        offersList: [],
        isOffersLoading: false,
        city: 'Paris',
        isOfferLoading: false,
        nearbyOffers: [],
        comments: [],
      },
    });

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });

  it('should render 404 page on unknown route', () => {
    renderWithProviders(<App />, {
      route: '/unknown',
      preloadedState: {
        authorizationStatus: AuthorizationStatus.Auth,
        offersList: fakeOffers,
        isOffersLoading: false,
        city: 'Paris',
        isOfferLoading: false,
        nearbyOffers: [],
        comments: [],
      },
    });

    expect(screen.getByText('404')).toBeInTheDocument();
  });
});
