import { api } from '@/redux/api/apiSlice';
import {createAsyncThunk} from "@reduxjs/toolkit";
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
      providesTags: (result, error, id) => [{ type: 'Book', id }],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/book/${id}`,
        method: 'DELETE',
      }),
      // invalidatesTags: ['book'],
    }),
    postReview: builder.mutation({
      query: ({ id, data }) => ({
        url: `/book/add-review/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Book', id }],
    }),
    // getComment: builder.query({
    //   query: (id) => `/comment/${id}`,
    //   providesTags: ['comments'],
    // }),
    addBook: builder.mutation({
      query: ({ email, password }) => ({
        url: '/books/addBooks',
        method: 'POST',
        body: { email, password },
      }),
    }),


    // Fetches the user's wishlist
    getWishlist: builder.query({
      query: (userEmail) => `/wishlist/${userEmail}`,
      providesTags: (result, error, userEmail) => [{ type: 'Wishlist', userEmail }],
    }),

    // Adds a book to the wishlist
    addToWishlist: builder.mutation({
      query: ({ userEmail, bookId }) => ({
        url: `/wishlist`,
        method: 'POST',
        body: { userEmail, bookId },
      }),
      invalidatesTags: (result, error, { userEmail }) => [{ type: 'Wishlist', userEmail }],
      // invalidatesTags: [{ type: 'Wishlist' }],
    }),

    // Removes a book from the wishlist
    removeFromWishlist: builder.mutation({
      query: ({ userEmail, bookId }) => ({
        url: `/wishlist/${userEmail}/${bookId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { userEmail }) => [{ type: 'Wishlist', userEmail }],

      // invalidatesTags: [{ type: 'Wishlist', id: 'List' }],
    }),
  }),
});

export const {
  // useGetCommentQuery,
  useGetBooksQuery,
  useDeleteBookMutation,
  useGetLastTenBooksQuery,
  usePostReviewMutation,
  useSingleBookQuery,
  useAddBookMutation,

  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} = bookApi;
