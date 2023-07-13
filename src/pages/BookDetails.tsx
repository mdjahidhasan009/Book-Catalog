import ProductReview from '@/components/ProductReview';
import { Button } from '@/components/ui/button';
import { useSingleBookQuery } from '@/redux/features/books/bookApi.ts';
import { useParams } from 'react-router-dom';

export default function BookDetails() {
  const { id } = useParams();

  const { data: book, isLoading, error } = useSingleBookQuery(id);
  const isoDateString = book?.publicationDate;
  const isoDate = new Date(isoDateString);
  const formattedDate = isoDate.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric"
  });


  return (
    <>
      <div className="flex max-w-7xl mx-auto items-center border-b border-gray-300">
        <div className="w-[50%]">
          <img src={book?.image} alt="" />
        </div>
        <div className="w-[50%] space-y-3 flex justify-center items-center flex-col	">
          <h1 className="text-3xl font-semibold">{book?.title}</h1>
          <p className="text-xl">Author: {book?.author}</p>
          <p className="text-xl">Genre: {book?.genre}</p>
          <p className="text-xl">Publication Date: {formattedDate}</p>
          <div className="">
            <Button className="mr-10 mt-5">Edit</Button>
            <Button>Delete</Button>
          </div>
        </div>
      </div>
      <ProductReview id={id!} />
    </>
  );
}
