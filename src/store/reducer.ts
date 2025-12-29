import { createReducer } from '@reduxjs/toolkit';
import { changeCity, setSortType, setSelectedPoint } from './action';
import {
  fetchOffersAction,
  checkAuthAction,
  loginAction,
  fetchOfferAction,
  fetchNearbyOffersAction,
  fetchCommentsAction,
  postCommentAction,
  fetchFavoritesAction,
  toggleFavoriteAction,
} from './api-actions';
import { Offer } from '../types/offer';
import { AuthorizationStatus } from '../const';
import { Comment } from '../types/comment';

export type StateType = {
  city: string;
  offersList: Offer[];
  favorites: Offer[];
  selectedSortType: string;
  selectedPoint: { title: string } | null;
  isOffersLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  userEmail: string | null;
  currentOffer: Offer | null;
  nearbyOffers: Offer[];
  comments: Comment[];
  isOfferLoading: boolean;
};

const initialState: StateType = {
  city: 'Paris',
  offersList: [],
  favorites: [],
  selectedSortType: 'Popular',
  selectedPoint: null,
  isOffersLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  userEmail: null,
  currentOffer: null,
  nearbyOffers: [],
  comments: [],
  isOfferLoading: false,
};

export { initialState };

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, { payload }) => {
      state.city = payload;
    })
    .addCase(setSortType, (state, { payload }) => {
      state.selectedSortType = payload;
    })
    .addCase(setSelectedPoint, (state, { payload }) => {
      state.selectedPoint = payload;
    })

    // offers
    .addCase(fetchOffersAction.pending, (state) => {
      state.isOffersLoading = true;
    })
    .addCase(fetchOffersAction.fulfilled, (state, { payload }) => {
      state.offersList = payload;
      state.isOffersLoading = false;
    })
    .addCase(fetchOffersAction.rejected, (state) => {
      state.offersList = [];
      state.isOffersLoading = false;
    })

    // single offer
    .addCase(fetchOfferAction.pending, (state) => {
      state.isOfferLoading = true;
    })
    .addCase(fetchOfferAction.fulfilled, (state, { payload }) => {
      state.currentOffer = payload;
      state.isOfferLoading = false;
    })
    .addCase(fetchOfferAction.rejected, (state) => {
      state.currentOffer = null;
      state.isOfferLoading = false;
    })

    // nearby
    .addCase(fetchNearbyOffersAction.fulfilled, (state, { payload }) => {
      state.nearbyOffers = payload;
    })

    // comments
    .addCase(fetchCommentsAction.fulfilled, (state, { payload }) => {
      state.comments = payload;
    })
    .addCase(postCommentAction.fulfilled, (state, { payload }) => {
      state.comments = payload;
    })

    // favorites
    .addCase(fetchFavoritesAction.fulfilled, (state, { payload }) => {
      state.favorites = payload;
    })
    .addCase(toggleFavoriteAction.fulfilled, (state, { payload }) => {
      const updateOffers = (offers: Offer[]) =>
        offers.map((offer) =>
          offer.id === payload.id ? payload : offer
        );

      state.offersList = updateOffers(state.offersList);
      state.nearbyOffers = updateOffers(state.nearbyOffers);

      if (state.currentOffer?.id === payload.id) {
        state.currentOffer = payload;
      }
    })

    // auth
    .addCase(checkAuthAction.fulfilled, (state, { payload }) => {
      state.authorizationStatus = AuthorizationStatus.Auth;
      state.userEmail = payload.email;
    })
    .addCase(checkAuthAction.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    })
    .addCase(loginAction.fulfilled, (state, { payload }) => {
      state.authorizationStatus = AuthorizationStatus.Auth;
      state.userEmail = payload.email;
    });
});


