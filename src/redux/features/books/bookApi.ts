import { api } from '@/redux/api/apiSlice';
import {createAsyncThunk} from "@reduxjs/toolkit";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "@/lib/firebase.ts";
import {AddBookFormInputs, EditBookFormInputs} from "@/interfaces/book.ts";

export const addBook = createAsyncThunk(
  'book/addBook',
  async ({ title, author, genre, publicationDate, image, price }: AddBookFormInputs) => {
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


export const editBook = createAsyncThunk(
  'book/editBook',
  async ({ id, title, author, genre, publicationDate, image, price }: EditBookFormInputs) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_backendAPI}/book/${id}`, {
        method: 'PATCH',
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
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/book/${id}`,
        method: 'DELETE',
      }),
      // invalidatesTags: ['book'],
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
  useDeleteBookMutation,
  useGetLastTenBooksQuery,
  usePostCommentMutation,
  useSingleBookQuery,
  useAddBookMutation,
} = bookApi;
