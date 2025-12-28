import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Offer } from '../types/offer';

type ThunkApiConfig = {
  extra: AxiosInstance;
};

export const fetchOffersAction = createAsyncThunk<
  Offer[],
  undefined,
  ThunkApiConfig
>('offers/fetchOffers', async (_arg, { extra: api }) => {
  const { data } = await api.get<Offer[]>('/offers');
  return data;
});
