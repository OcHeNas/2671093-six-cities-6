import { createReducer } from '@reduxjs/toolkit';
import { changeCity, setSortType, setSelectedPoint } from './action';
import { fetchOffersAction } from './api-actions';
import { Offer } from '../types/offer';

type StateType = {
  city: string;
  offersList: Offer[];
  selectedSortType: string;
  selectedPoint: { title: string } | null;
  isOffersLoading: boolean;
};

const initialState: StateType = {
  city: 'Paris',
  offersList: [],
  selectedSortType: 'Popular',
  selectedPoint: null,
  isOffersLoading: false,
};

const reducer = createReducer(initialState, (builder) => {
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

    // async
    .addCase(fetchOffersAction.pending, (state) => {
      state.isOffersLoading = true;
    })
    .addCase(fetchOffersAction.fulfilled, (state, { payload }) => {
      state.offersList = payload;
      state.isOffersLoading = false;
    })
    .addCase(fetchOffersAction.rejected, (state) => {
      state.isOffersLoading = false;
    });
});

export { reducer };

