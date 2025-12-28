import { createReducer } from '@reduxjs/toolkit';
import { changeCity, setSortType, setSelectedPoint } from './action';
import { fetchOffersAction, checkAuthAction, loginAction, fetchOfferAction, fetchNearbyOffersAction, fetchCommentsAction, postCommentAction } from './api-actions';
import { Offer } from '../types/offer';
import { AuthorizationStatus } from '../const';
import { Comment } from '../types/comment';

type StateType = {
  city: string;
  offersList: Offer[];
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

    // fetch all offers
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

    // offer
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


