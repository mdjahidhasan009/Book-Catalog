import ProductReview from '@/components/ProductReview';
import { Button } from '@/components/ui/button';
import {useDeleteBookMutation, useSingleBookQuery} from '@/redux/features/books/bookApi.ts';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function BookDetails() {
  const { id } = useParams();
  let navigate = useNavigate();
  const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();

  const { data: book, isLoading, error } = useSingleBookQuery(id);
  const isoDateString = book?.publicationDate;
  const isoDate = new Date(isoDateString);
  const formattedDate = isoDate.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric"
  });

  // Custom function to show confirmation dialog
  async function showConfirmDialog() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Perform delete action here (e.g., delete the file)
        await deleteFile();
      }
    });
  }

// Function to delete the file (replace this with your actual delete logic)
  async function  deleteFile() {
    await deleteBook(id);
    await Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
  }


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
            <Button
              className="mr-10 mt-5"
              onClick={() => navigate(`/edit-book/${id}`)}
            >
              Edit
            </Button>
            <Button
              onClick={showConfirmDialog}
              disabled={isDeleting}
            >Delete</Button>
          </div>
        </div>
      </div>
      <ProductReview id={id!} />
    </>
  );
}
