import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_backendAPI }),
  tagTypes: ['Book', 'Wishlist', 'ReadingList'],
  endpoints: () => ({}),
});
