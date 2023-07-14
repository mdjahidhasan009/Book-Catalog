import { IBook } from '@/types/globalTypes';
import { toast } from './ui/use-toast';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '@/redux/hook';
import { addToCart } from '@/redux/features/cart/cartSlice';
import {useAddToWishlistMutation} from "@/redux/features/books/bookApi.ts";
import {isErrorResult} from "@/utils/utils.ts";

interface IProps {
  book: IBook;
}

export default function BookCard({ book }: IProps) {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [addToWishlist, { isLoading, isError }] = useAddToWishlistMutation();

  const isoDateString = book.publicationDate;
  const isoDate = new Date(isoDateString);
  const formattedDate = isoDate.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric"
  });
  const handleAddBook = async (book: IBook) => {
    if (isLoading) return;
// console.log({ userEmail: user?.email!, bookId: book._id })
    try {
      const result = await addToWishlist({ userEmail: user?.email!, bookId: book._id });
      if(isErrorResult(result) && result.error instanceof Error) {
        toast({
          description: 'Failed to add the book. Please try again',
        });
        throw new Error('Failed to add the book. Please try again');
      }
      toast({
        description: 'Book Added',
      });
    } catch (error) {
      console.error(error);
      toast({
        description: 'Failed to add the book. Please try again',
      });
    }
  };


  return (
    <div>
      <div className="rounded-2xl h-[480px] flex flex-col items-start justify-between p-5 overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl hover:scale-[102%] transition-all gap-2">
        <Link to={`/book-details/${book._id}`} className="w-full">
          <img src={book?.image} alt="book" />
          <h1 className="text-xl font-semibold">{book?.title}</h1>
        </Link>
        <p>Author: {book?.author}</p>
        <p>Genre: {book?.genre}</p>
        <p>Publication Date: {formattedDate}</p>
        {/*<p>Rating: {book?.rating}</p>*/}
        {/*<p className="text-sm">*/}
        {/*  Availability: {book?.status ? 'In stock' : 'Out of stock'}*/}
        {/*</p>*/}
        <p className="text-sm">Price: {book?.price}</p>
        <Button variant="default" onClick={() => handleAddBook(book)}>
          Add to wishlist
        </Button>
      </div>
    </div>
  );
}
