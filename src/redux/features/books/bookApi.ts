import { api } from '@/redux/api/apiSlice';
import {createAsyncThunk} from "@reduxjs/toolkit";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "@/lib/firebase.ts";
import {AddBookFormInputs} from "@/interfaces/book.ts";

export const addBook = createAsyncThunk(
  'book/addBook',
  async ({ title, author, genre, publicationDate, image, price }: AddBookFormInputs) => {
    console.log(new Date(publicationDate))
    console.log({ title, author, genre, publicationDate: new Date(publicationDate), image, price })
    try {
      const response = await fetch(`${import.meta.env.VITE_backendAPI}/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, author, genre, publicationDate: new Date(publicationDate), image, price }),
      });

      if (!response.ok) {
        throw new Error('Failed to add book');
      }

      const data = await response.json();
      return data; // Return the added book data
    } catch (error) {
      throw new Error((error as Error).message);;
    }
  }
);

const bookApi = api.injectEndpoints?.({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => '/books',
    }),
    getLastTenBooks: builder.query({
      query: () => '/books/last-ten',
    }),
    singleBook: builder.query({
      query: (id) => `/book/${id}`,
    }),
    postComment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/comment/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['comments'],
    }),
    getComment: builder.query({
      query: (id) => `/comment/${id}`,
      providesTags: ['comments'],
    }),
    addBook: builder.mutation({
      query: ({ email, password }) => ({
        url: '/books/addBooks',
        method: 'POST',
        body: { email, password },
      }),
    }),
  }),
});

export const {
  useGetCommentQuery,
  useGetBooksQuery,
  useGetLastTenBooksQuery,
  usePostCommentMutation,
  useSingleBookQuery,
  useAddBookMutation,
} = bookApi;
