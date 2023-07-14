import {useGetWishlistQuery, useRemoveFromWishlistMutation} from "@/redux/features/books/bookApi.ts";
import {useAppSelector} from "@/redux/hook.ts";
import {IBook} from "@/types/globalTypes.ts";
import {toast} from "@/components/ui/use-toast.ts";
import {isErrorResult} from "@/utils/utils.ts";

const Wishlist = () => {
  const { user } = useAppSelector((state) => state.user);
  const {data, isLoading, error} = useGetWishlistQuery(user?.email);
  const [removeFromWishlist, { isLoading: isAddingToWishlist, isError }] = useRemoveFromWishlistMutation();


  const deleteBookFromWishlist = async (bookId: number) => {
    try {
      const result = await removeFromWishlist({ userEmail: user?.email!, bookId: bookId });

      if(isErrorResult(result) && result.error instanceof Error) {
        toast({
          description: 'Failed to remove from wishlist. Please try again',
        });
        throw new Error('Failed to add the book. Please try again');
      }
      toast({
        description: 'Book removed',
      });
    } catch (error) {
      console.error(error);
      toast({
        description: 'Failed to remove from wishlist. Please try again',
      });
    }
  };

  return (

    <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-full m-5">
      <div className="my-auto h-full">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Title
            </th>
            <th scope="col" className="px-6 py-3">
              Author
            </th>
            <th scope="col" className="px-6 py-3">
              Genre
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
          </thead>

          <tbody>
          {/*<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">*/}
            {data?.wishlist.map((book: IBook) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {book.title}
                </th>
                <td className="px-6 py-4">
                  {book.author}
                </td>
                <td className="px-6 py-4">
                  {book.genre}
                </td>
                <td className="px-6 py-4">
                  {book.price}
                </td>
                <td className="px-6 py-4">
                  <p className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer"
                    onClick={() => deleteBookFromWishlist(book._id)}
                  >
                    Delete
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  )
}

export default Wishlist;