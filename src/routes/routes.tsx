import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import Home from '@/pages/Home';
import Books from '@/pages/Books.tsx';
import Checkout from '@/pages/Checkout';
import Signup from '@/pages/Signup';
import BookDetails from '@/pages/BookDetails.tsx';
import PrivateRoute from './PrivateRoute';
import {AddBook} from "@/pages/AddBook.tsx";
import {EditBook} from "@/pages/EditBook.tsx";
import Wishlist from "@/pages/Wishlist.tsx";
import ReadingList from "@/pages/Readinglist.tsx";

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/books',
        element: <Books />,
      },
      {
        path: '/book-details/:id',
        element: <BookDetails />,
      },
      {
        path: '/add-new-book',
        element: <AddBook />
      },
      {
        path: '/edit-book/:id',
        element: <EditBook />
      },
      {
        path: '/wishlist',
        element: (
          <PrivateRoute>
            <Wishlist />,
          </PrivateRoute>
        ),
      },
      {
        path: '/readinglist',
        element: (
          <PrivateRoute>
            <ReadingList />,
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default routes;
