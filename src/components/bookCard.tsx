import { IBook } from '@/types/globalTypes';
import { toast } from './ui/use-toast';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '@/redux/hook';
import { addToCart } from '@/redux/features/cart/cartSlice';

interface IProps {
  book: IBook;
}

export default function BookCard({ book }: IProps) {
  const dispatch = useAppDispatch();
  const isoDateString = book.publicationDate;
  const isoDate = new Date(isoDateString);
  const formattedDate = isoDate.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric"
  });

  const handleAddBook = (book: IBook) => {
    dispatch(addToCart(book));
    toast({
      description: 'Book Added',
    });
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
          Add to cart
        </Button>
      </div>
    </div>
  );
}
