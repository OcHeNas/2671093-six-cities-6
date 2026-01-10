import { reducer, initialState } from './reducer';
import {
  fetchOffersAction,
  fetchOfferAction,
  fetchNearbyOffersAction,
  fetchCommentsAction,
  postCommentAction,
  fetchFavoritesAction,
  toggleFavoriteAction,
  checkAuthAction,
  loginAction,
} from './api-actions';
import { mockOffer, mockOffers } from '../mocks/offers';
import { AuthorizationStatus } from '../const';

describe('Reducer', () => {
  it('should return initial state with empty action', () => {
    const result = reducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  /* =====================
     FULFILLED
  ====================== */

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

  /* =====================
     REJECTED
  ====================== */

  it('should reset offersList on fetchOffersAction.rejected', () => {
    const state = {
      ...initialState,
      offersList: mockOffers,
      isOffersLoading: true,
    };

    const result = reducer(
      state,
      fetchOffersAction.rejected(null, '', undefined)
    );

    expect(result.offersList).toEqual([]);
    expect(result.isOffersLoading).toBe(false);
  });

  it('should reset currentOffer on fetchOfferAction.rejected', () => {
    const state = {
      ...initialState,
      currentOffer: mockOffer,
      isOfferLoading: true,
    };

    const result = reducer(
      state,
      fetchOfferAction.rejected(null, '', mockOffer.id)
    );

    expect(result.currentOffer).toBeNull();
    expect(result.isOfferLoading).toBe(false);
  });

  it('should set NoAuth on checkAuthAction.rejected', () => {
    const result = reducer(
      initialState,
      checkAuthAction.rejected(null, '', undefined)
    );

    expect(result.authorizationStatus).toBe(
      AuthorizationStatus.NoAuth
    );
  });

  it('should not change state on loginAction.rejected', () => {
    const result = reducer(
      initialState,
      loginAction.rejected(null, '', {
        email: 'test@test.com',
        password: '123456',
      })
    );

    expect(result).toEqual(initialState);
  });

  it('should not change nearbyOffers on fetchNearbyOffersAction.rejected', () => {
    const state = {
      ...initialState,
      nearbyOffers: mockOffers,
    };

    const result = reducer(
      state,
      fetchNearbyOffersAction.rejected(null, '', mockOffer.id)
    );

    expect(result.nearbyOffers).toEqual(mockOffers);
  });

  it('should not change comments on fetchCommentsAction.rejected', () => {
    const state = {
      ...initialState,
      comments: [],
    };

    const result = reducer(
      state,
      fetchCommentsAction.rejected(null, '', mockOffer.id)
    );

    expect(result.comments).toEqual([]);
  });

  it('should not change comments on postCommentAction.rejected', () => {
    const state = {
      ...initialState,
      comments: [],
    };

    const result = reducer(
      state,
      postCommentAction.rejected(null, '', {
        id: mockOffer.id,
        comment: 'text',
        rating: 5,
      })
    );

    expect(result.comments).toEqual([]);
  });

  it('should not change favorites on fetchFavoritesAction.rejected', () => {
    const state = {
      ...initialState,
      favorites: mockOffers,
    };

    const result = reducer(
      state,
      fetchFavoritesAction.rejected(null, '', undefined)
    );

    expect(result.favorites).toEqual(mockOffers);
  });

  it('should not change offers on toggleFavoriteAction.rejected', () => {
    const state = {
      ...initialState,
      offersList: mockOffers,
    };

    const result = reducer(
      state,
      toggleFavoriteAction.rejected(null, '', {
        offerId: mockOffer.id,
        status: 1,
      })
    );

    expect(result.offersList).toEqual(mockOffers);
  });
});


