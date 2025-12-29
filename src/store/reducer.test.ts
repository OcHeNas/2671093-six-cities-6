import { reducer, initialState } from './reducer';
import {
  fetchOffersAction,
  fetchOfferAction,
  fetchNearbyOffersAction,
  fetchCommentsAction,
  fetchFavoritesAction,
  toggleFavoriteAction,
} from './api-actions';
import { mockOffer, mockOffers } from '../mocks/offers';

describe('Reducer', () => {
  it('should return initial state with empty action', () => {
    const result = reducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('should set offersList after fetchOffersAction.fulfilled', () => {
    const result = reducer(
      initialState,
      fetchOffersAction.fulfilled(mockOffers, '', undefined)
    );

    expect(result.offersList).toEqual(mockOffers);
    expect(result.isOffersLoading).toBe(false);
  });

  it('should set currentOffer after fetchOfferAction.fulfilled', () => {
    const result = reducer(
      initialState,
      fetchOfferAction.fulfilled(mockOffer, '', mockOffer.id)
    );

    expect(result.currentOffer).toEqual(mockOffer);
    expect(result.isOfferLoading).toBe(false);
  });

  it('should set nearbyOffers after fetchNearbyOffersAction.fulfilled', () => {
    const result = reducer(
      initialState,
      fetchNearbyOffersAction.fulfilled(mockOffers, '', mockOffer.id)
    );

    expect(result.nearbyOffers).toEqual(mockOffers);
  });

  it('should set comments after fetchCommentsAction.fulfilled', () => {
    const comments = [
      {
        id: '1',
        comment: 'Nice',
        rating: 4,
        date: '2024-01-01',
        user: {
          name: 'John',
          avatarUrl: '',
          isPro: false,
        },
      },
    ];

    const result = reducer(
      initialState,
      fetchCommentsAction.fulfilled(comments, '', mockOffer.id)
    );

    expect(result.comments).toEqual(comments);
  });

  it('should set favorites after fetchFavoritesAction.fulfilled', () => {
    const result = reducer(
      initialState,
      fetchFavoritesAction.fulfilled(mockOffers, '', undefined)
    );

    expect(result.favorites).toEqual(mockOffers);
  });

  it('should update offer in lists after toggleFavoriteAction.fulfilled', () => {
    const state = {
      ...initialState,
      offersList: [mockOffer],
      nearbyOffers: [mockOffer],
      currentOffer: mockOffer,
    };

    const updatedOffer = { ...mockOffer, isFavorite: true };

    const result = reducer(
      state,
      toggleFavoriteAction.fulfilled(updatedOffer, '', {
        offerId: mockOffer.id,
        status: 1,
      })
    );

    expect(result.offersList[0].isFavorite).toBe(true);
    expect(result.nearbyOffers[0].isFavorite).toBe(true);
    expect(result.currentOffer?.isFavorite).toBe(true);
  });
});

