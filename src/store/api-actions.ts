import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Offer } from '../types/offer';
import { AuthInfo } from '../types/auth-info';
import { saveToken } from '../services/token';
import { Comment } from '../types/comment';

type ThunkApiConfig = {
  extra: AxiosInstance;
};

export const fetchOffersAction = createAsyncThunk<
  Offer[],
  undefined,
  ThunkApiConfig
>('offers/fetch', async (_arg, { extra: api }) => {
  const { data } = await api.get<Offer[]>('/offers');
  return data;
});

export const checkAuthAction = createAsyncThunk<
  AuthInfo,
  undefined,
  ThunkApiConfig
>('auth/check', async (_arg, { extra: api }) => {
  const { data } = await api.get<AuthInfo>('/login');
  return data;
});

export const loginAction = createAsyncThunk<
  AuthInfo,
  { email: string; password: string },
  ThunkApiConfig
>('auth/login', async ({ email, password }, { extra: api }) => {
  const { data } = await api.post<AuthInfo>('/login', {
    email,
    password,
  });
  saveToken(data.token);
  return data;
});

export const fetchOfferAction = createAsyncThunk<
  Offer,
  string,
  ThunkApiConfig
>('offer/fetch', async (id, { extra: api }) => {
  const { data } = await api.get<Offer>(`/offers/${id}`);
  return data;
});

export const fetchNearbyOffersAction = createAsyncThunk<
  Offer[],
  string,
  ThunkApiConfig
>('offer/nearby', async (id, { extra: api }) => {
  const { data } = await api.get<Offer[]>(`/offers/${id}/nearby`);
  return data;
});

export const fetchCommentsAction = createAsyncThunk<
  Comment[],
  string,
  ThunkApiConfig
>('comments/fetch', async (id, { extra: api }) => {
  const { data } = await api.get<Comment[]>(`/comments/${id}`);
  return data;
});

export const postCommentAction = createAsyncThunk<
  Comment[],
  { id: string; comment: string; rating: number },
  ThunkApiConfig
>('comments/post', async ({ id, comment, rating }, { extra: api }) => {
  const { data } = await api.post<Comment[]>(`/comments/${id}`, {
    comment,
    rating,
  });
  return data;
});

